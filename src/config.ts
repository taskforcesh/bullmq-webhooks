export default {
  taskQueueName: process.env.TASK_QUEUE_NAME || "tasks",
  webhooksQueueName: process.env.WEBHOOK_QUEUE_NAME || "webhooks",
  mailQueueName: process.env.QUEUE_NAME || "mailbot",

  maxAttempts: 10,
  maxAttemptsForEmail: 5,

  backoffDelay: 2000,

  concurrency: parseInt(process.env.QUEUE_CONCURRENCY || "1"),
  connection: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || "6379"),
  },

  port: 9000,
  userPort: 8080,
};
