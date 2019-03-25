---
date: "2019-03-20T10:01:28.509Z"
title: "AWS Kinesis Producer Retry Strategy"
tags:
    - aws
    - kinesis
    - python
    - retry
    - strategy
cover: "kinesis-streams.png"
coverAlt: "A picture of AWS Kinesis streams dashboard"
---

Pushing data to AWS Kinesis Data Streams can and does fail, especially if you do not
have enough shards or your shards are not evenly balanced. Under-provisioning will
usually get you the all-dreaded `ProvisionedThroughputExceededException`.

It's important to understand that Kinesis Streams can fail with a [vast range of errors](https://docs.aws.amazon.com/kinesis/latest/APIReference/CommonErrors.html),
but we are going to discuss how to avoid hitting a busy or non-available shard thus resulting in throughput errors.

Producing data to Kinesis is easily achieved with the `boto3` python library (Assuming you have configured AWS with sufficient permissions):

```python
import boto3
import json

kinesis = boto3.client('kinesis')

payloadA = { 'A Key': 'A Value' }
payloadB = { 'A Key Again': 'A Value Again'}

recordA = { 'Data': json.dumps(payloadA), 'PartitionKey': 'key1' }
recordB = { 'Data': json.dumps(payloadB), 'PartitionKey': 'key2' }

kinesis.put_records(StreamName='input_stream', Records=[recordA, recordB])
```

This will write 2 records as a batch to the Kinesis Stream. Notice the `PartitionKey`, which will be used by Kinesis to
calculate a hash which determines to which shard (Assuming you have more than one) the record goes. It's important that you
evenly balance your data, otherwise you'll find that several shards are receiving unusually high load, while others
are mostly idle.

In most cases, you should be writing data to a random shard, ensuring uniform distribution of the data. This can be achieved
with a good random partition key generator (Which we'll see in a few moments). As an alternative, if you have a way to evenly
partition your data (Again, ensuring uniform distribution), such as if you have a batch of people data, and they are evenly
distributed by `gender`, you can use that as the partition key.

In other cases, you want to batch records together in the same shard (extracting them together as well) for grouping reasons.
[This linked article](https://www.eyeviewdigital.com/tech/scaling-aws-kinesis-creating-a-streaming-superhighway/) covers it really well
(And other cases too).

In this post I'll focus on the case where a random key works well. In particular, while searching for posts on the subject myself, and not finding them,
we'll cover how to do failure handling with Kinesis.

In high-throughput cases with Kinesis, I've found there are sporadic failures. Errors such as `InternalFailure` happen from time to time.
You want to be able to catch them, log them, and correctly retry the failed records.

What kind of [response do you receive from a kinesis `put_records` operation]((https://docs.aws.amazon.com/kinesis/latest/APIReference/API_PutRecords.html))?

```json
{
   "EncryptionType": "string",
   "FailedRecordCount": number,
   "Records": [
      {
         "ErrorCode": "string",
         "ErrorMessage": "string",
         "SequenceNumber": "string",
         "ShardId": "string"
      }
   ]
}
```

So we can first check if `FailedRecordCount > 0` to see if there was a failure in producing any of the records, and then
extract the error codes and message for logging, but also for figuring out which records to retry. It's important to note
that in order to retrieve the failed record for resubmission, we will use the index of the response in the `Records` array.

```python
import time
import uuid

def submit_record_by_batch_to_kinesis(client, records, batch_limit=100):
    while records:
        batch = records[:batch_limit]
        response = client.put_records(StreamName='input_stream', Records=batch)

        failed_record_count = response.get('FailedRecordCount', 0)
        if not failed_record_count:
            records = records[batch_limit:]
            continue

        logger.info('%d records failed have failed in kinesis.put_records; will be retried',
                       failed_record_count)

        # extract and log distinct errors
        errors = {(r.get('ErrorCode'), r.get('ErrorMessage')) for r in response['Records'] if 'ErrorCode' in r}
        logger.warning('Distinct errors received from Kinesis: %s', errors)

        failed_records = [batch[i] for i, record in enumerate(response['Records']) if 'ErrorCode' in record]

        # Recreate the partition key for each failed record
        renewed_records = renew_records_partition_key(failed_records)
        records = list(renewed_records) + records[batch_limit:]

        time.sleep(0.005)

def renew_records_partition_key(failed_records):
    for record in failed_records:
        record['PartitionKey'] = str(uuid.uuid4())
        yield record
```

Several things to note about the above code:

- How we extract `ErrorCode` and `ErrorMessage` from the failed records
- Matching the failed records by index from the Kinesis response
- Batching
- Recreating the partition key for the failed records

This naive solution is good, but AWS Kinesis has [more constraints](https://docs.aws.amazon.com/kinesis/latest/APIReference/API_PutRecords.html)
that we'll need to comply with:

> Each PutRecords request can support up to 500 records.
  Each record in the request can be as large as 1 MiB, up to a limit of 5 MiB for the entire request, including partition keys.
  Each shard can support writes up to 1,000 records per second, up to a maximum data write total of 1 MiB per second.

Here is a more complete solution:

```python
import os
import sys
import uuid
import logging
from logging import Logger
from time import sleep

import boto3
from botocore.client import BaseClient


class KinesisProducer:
    MAX_CHUNK_RETRY_ATTEMPTS = 20
    MAX_RECORD_SIZE = 1024 * 1024
    MAX_RECORDS_IN_BATCH = 500
    MAX_BATCH_SIZE = MAX_RECORD_SIZE * 5

    kinesis_client: BaseClient
    logger: Logger
    stream_name: str

    def __init__(self, stream_name: str) -> None:
        self.kinesis_client = boto3.client('kinesis')
        self.logger = logging.getLogger(__name__)
        self.stream_name = stream_name

        self.logger.basicConfig(level=logging.INFO)

    def produce_records(self, records):
        self.logger.info("Pushing records to Kinesis stream: %s", self.stream_name)

        # Kinesis stream put_records limits:
        # Maximum 500 records
        # Each record size cannot be more than 1MB in size
        # Total records size in submit must not be more than 5MB in size

        records_batch = []
        total_size = 0

        for datum in records:
            datum_size = self.get_record_size(datum)
            if datum_size > self.MAX_RECORD_SIZE:
                self.logger.error("Record size of %d is too big to submit to Kinesis: %s", datum_size, datum)
                continue

            if self.can_add_record_to_batch(total_size, datum_size, records_batch):
                records_batch.append(datum)
                total_size += datum_size
                continue

            self.logger.info("Reached Kinesis submit limits at %d records", len(records_batch))
            # record will take us over the limit, submit chunk now, and keep record
            self.submit_chunk_with_retries(records_batch)

            # Assume all records in chunk were submitted or forfeited
            records_batch = [datum]
            total_size = datum_size

        if records_batch:
            self.logger.info("Finalizing Kinesis submit with %d records", len(records_batch))
            self.submit_chunk_with_retries(records_batch)

        self.logger.debug("Done pushing records to kinesis output stream %s", self.stream_name)

    def can_add_record_to_batch(self, total_size, record_size, records_chunk) -> bool:
        if total_size + record_size >= self.MAX_BATCH_SIZE:
            return False

        return len(records_chunk) < self.MAX_RECORDS_IN_BATCH

    @staticmethod
    def get_record_size(record):
        return len(record["Data"]) + len(record["PartitionKey"])

    @staticmethod
    def renew_records_partition_key(failed_records):
        for record in failed_records:
            record['PartitionKey'] = str(uuid.uuid4())
            yield record

    def submit_chunk_with_retries(self, records, attempt=0):
        if attempt >= self.MAX_CHUNK_RETRY_ATTEMPTS:
            self.logger.error("Failed %d times to submit records to kinesis, skipping them", attempt)
            return

        response = self.kinesis_client.put_records(StreamName=self.stream_name, Records=records)

        failed_record_count = response.get("FailedRecordCount", 0)
        if not failed_record_count:
            self.logger.debug("Successfully submitted %d records to kinesis", len(records))
            return

        self.logger.warning(
            "%d records failed have failed in kinesis.put_records; will be retried", failed_record_count
        )
        self.extract_and_log_errors(response)

        records_to_retry = list(
            self.renew_records_partition_key(self.get_failed_records_by_response(records, response))
        )

        # Poor man's back-off
        sleep(0.005 * (attempt + 1))

        self.submit_chunk_with_retries(records_to_retry, attempt + 1)

    @staticmethod
    def get_failed_records_by_response(records, response):
        return (records[i] for i, record in enumerate(response["Records"]) if "ErrorCode" in record)

    def extract_and_log_errors(self, response):
        errors = {(r.get("ErrorCode"), r.get("ErrorMessage")) for r in response["Records"] if "ErrorCode" in r}
        self.logger.warning("Distinct errors received from Kinesis: %s", errors)
```

The above strategy can be improved even more. We should also create a subset of errors over which we retry,
and just log the rest. Some errors are unrecoverable, so the retries are a waste.

This retry strategy has worked well for us while pushing to 100 to 150 shards in a Kinesis Stream.
