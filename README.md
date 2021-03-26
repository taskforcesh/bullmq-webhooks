# BullMQ Tutorial - Webhooks

This repo includes the code for the Webhooks tutorial ().

# Install

Just clone this repo and when inside the repo install the dependencies:

```
   yarn
```

In order to test this code you need to run 3 different services, a main server
that accepts posting tasks, a client server that will be called by the webhook worker,
and a service to start the workers.

Main service:

```
   yarn start
```

Client test server:

```
   yarn start:test
```

Workers:

```
   yarn start:workers
```
