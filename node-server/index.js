"use strict";

const express = require("express");

// Constants
const PORT = 1234;
const HOST = "0.0.0.0";

// App
const app = express();
const apiRouter = express.Router();

apiRouter.get("/", (req, res) => {
  res.send("Hello from your express.js");
});

app.use('/api', apiRouter);

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});
