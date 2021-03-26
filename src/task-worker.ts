import { Worker, Queue } from "bullmq";
import config from "./config";

const webhooksQueue = new Queue("webhooks", { connection: config.connection });

/**
 *  This worker performs some task based on the job.name.
 *  When the task is completed (in this case we just perform a console.log)
 *  we add a new job to the webhooks queue, which will be used to notify
 *  the user that the task has been completed
 */

export const taskWorker = new Worker<{ userId: string; task: any }>(
  config.taskQueueName,
  async (job) => {
    console.log(`Processing job ${job.id} of type ${job.name}`);

    const result = `Result data from task performed for ${job.name} with ID ${job.id}`;

    return webhooksQueue.add(
      job.name,
      { userId: job.data.userId, result },
      {
        attempts: config.maxAttempts,
        backoff: { type: "exponential", delay: config.backoffDelay },
      }
    );
  },
  { connection: config.connection }
);
