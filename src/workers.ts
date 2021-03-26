import { webhooksWorker } from "./webhook-worker";
import { taskWorker } from "./task-worker";
import { QueueScheduler } from "bullmq";
import config from "./config";

const taskQueueScheduler = new QueueScheduler(config.taskQueueName, {
  connection: config.connection,
});

const webhookQueueScheduler = new QueueScheduler(config.webhooksQueueName, {
  connection: config.connection,
});

console.log(`Started workers: ${webhooksWorker.name} and ${taskWorker.name}`);

taskWorker.on("failed", (err) =>
  console.log("Failed processing task job", err)
);
webhookQueueScheduler.on("failed", (err) =>
  console.log("Failed processing webhook job", err)
);
