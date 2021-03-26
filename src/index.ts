import express from "express";
import { Queue } from "bullmq";
import config from "./config";

const app = express();

const taskQueue = new Queue("tasks", { connection: config.connection });

app.post("/users/:userId/tasks/:taskType", express.json(), (req, res) => {
  const taskData = req.body;

  console.log(`Received task "${req.params.taskType}" to process...`);

  taskQueue
    .add(req.params.taskType, { userId: req.params.userId, taskData })
    .then(
      (job) => {
        res.status(201).end(job.id);
      },
      (err) => {
        res.status(500).end(err);
      }
    );
});

console.log(`Start listening to port ${config.port}`);
app.listen(config.port);
