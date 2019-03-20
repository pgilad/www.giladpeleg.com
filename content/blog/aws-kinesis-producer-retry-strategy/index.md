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
[This article](https://www.eyeviewdigital.com/tech/scaling-aws-kinesis-creating-a-streaming-superhighway/) covers it really well
(And other cases too).

In this post I'll focus on the case where a random key works well. In particular, while searching for posts on the subject myself, and not finding them,
we'll cover how to do failure handling with Kinesis.

In high-throughput cases with Kinesis, I've found there are sporadic failures. Errors such as `InternalFailure` happen from time to time.
You want to be able to catch them, log them, and correctly retry the failed records.

What kind of response do you receive from a kinesis `put_records` operation?
It looks like [this](https://docs.aws.amazon.com/kinesis/latest/APIReference/API_PutRecords.html):

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

The above strategy can be improved even more. First, we can do the batching more efficiently. Second, we should 
limit the number of retries on the failed records. Third, we should also create a subset of errors over which we do retry, 
and for the rest, just log the error. Some errors are unrecoverable, so the retries are a waste.

Anyway, this retry strategy has worked well for us while using 100 to 150 shards in a Kinesis Stream.

