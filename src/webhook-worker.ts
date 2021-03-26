import { Worker, Queue } from "bullmq";
import got from "got";
import config from "./config";
import { MailJob } from "./mail-job.interface";
import { getUserById } from "./users";

const mailQueue = new Queue<MailJob>(config.mailQueueName, {
  connection: config.connection,
});

/**
 * This worker dispatches the results of the tasks to the users' webhooks.
 * It will try for a number of configured attempts, but if fails it will
 * try to send an email to the user notifying about the failue.
 *
 */
export const webhooksWorker = new Worker<{ userId: string; result: string }>(
  config.webhooksQueueName,
  async (job) => {
    const { userId, result } = job.data;
    const user = await getUserById(userId);

    const maxWebhookAttempts = config.maxAttempts - config.maxAttemptsForEmail;

    if (job.attemptsMade < maxWebhookAttempts) {
      console.log(
        `Calling webhook for "${result}", attempt ${
          job.attemptsMade + 1
        } of ${maxWebhookAttempts}`
      );
      await got.post(user.webhook, { json: { result } });
    } else {
      console.log(
        `Giving up, lets mail user about webhook not working for "${result}"`
      );
      // Send an email to the user about failing webhooks.
      return mailQueue.add("webhook-failure", {
        mailOpts: {
          from: "manast@taskforce.sh",
          subject: "Your Webhook is failing",
          text: `We tried to send a notification to your webhook ${user.webhook} ${maxWebhookAttempts} times and it is failing.`,
          to: user.email,
        },
      });
    }
  },
  {
    connection: config.connection,
  }
);
