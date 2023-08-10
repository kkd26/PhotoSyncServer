"use strict";

import express from "express";
import { apiRouter } from "./routers";

// Constants
const PORT = 1234;
const HOST = "0.0.0.0";

// App
const app = express();

app.use("/api", apiRouter);

app.all("/", (req, res) => {
  res.status(404);
  res.json({ error: "Not found" });
});

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});
