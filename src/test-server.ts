import express from "express";
import config from "./config";

const app = express();

app.post("/:id", express.json(), express.json(), (req, res) => {
  console.log("Received notification with", req.body);
  res.status(200).end();
});

console.log(`Test server start listening to port ${config.userPort}`);
app.listen(config.userPort);
