---
date: '2019-06-03T12:48:29.503Z'
title: 'Using Bastion Host to SSH Tunnel to Mongo Replica Set'
tags:
    - bastion
    - ssh
    - tunnel
    - mongo
    - ops
    - replica-set
cover: '2019-06-03-16-25-56.png'
coverAlt: 'Bastion Host and Mongo Replica Set in VPC'
---

We have a Mongo Replica set inside a AWS VPC that's inaccessible from the outside world. The common practice
for this is to create a [Bastion Host](https://en.wikipedia.org/wiki/Bastion_host) which has a leg in the VPC,
but also an available leg to the outside world (usually over a non-standard port open to SSH and filtered by ip so you can access it only from the office).

![SSHing into Bastion Host and Connecting to Mongo Replica Set](2019-06-03-16-25-56.png)

The first step (besides setting up the infrastructure) is to make sure you can connect manually to the Mongo hosts
after SSHing into the bastion host. Even before that, I hope you are using your `~/.ssh/config` file in order
to shorten your commands. Add an entry for your bastion host:

```ini
Host bastion-host
    User ubuntu
    HostName ec2-11-111-11-11.compute-1.amazonaws.com
    IdentityFile ~/.ssh/private-key.pem
    Port 2222
```

Then run:

```bash
$ ssh bastion-host
$ curl mongo-ip:27017
It looks like you are trying to access MongoDB over HTTP on the native driver port.
```

This is great, it means the mongo server is reachable.

Next, we'll setup port-forwarding to use the bastion host as a proxy server. Let's add a new entry in the
`~/.ssh/config` file:

```none
Host bastion-host-mongo-forward
    User ubuntu
    Port 2222
    IdentityFile ~/.ssh/private-key.pem
    HostName ec2-11-111-11-11.compute-1.amazonaws.com

    Localforward 3307 ip-10-10-10-247.ec2.internal:27017
    Localforward 3308 ip-10-10-10-242.ec2.internal:27017
    Localforward 3309 ip-10-10-10-117.ec2.internal:27017
```

This will allow us to create port-forwarding ssh tunnel using the bastion host to the mongo relica-set:

```bash
ssh -nNT bastion-host-mongo-forward
```

The addition of -nNT prevents us from actually connecting to the remote host (preventing TTY). Try it without it to see the difference (If you want to see the actual `ssh` commands being used, they are exactly
the same usage like [this article](../spring-boot-remote-jmx/#connecting-remotely-using-local-port-forwarding)).

Great our ssh tunnel is now setup. All that's left it to connect our Mongo client:

```bash
mongo 'mongodb://user:password@localhost:3307,localhost:3308,localhost:3309/mongo_db_name'
```

And you should be connected to the replica-set. Notice that when you connect to a replica-set you should add
a `replicaSet=myRS` query parameter ([See this Stack-Overflow issue](https://stackoverflow.com/questions/13912765/how-do-you-connect-to-a-replicaset-from-a-mongodb-shell)). You can always connect to the primary MongoDB server
and just drop the other servers.
