"use strict";

import express from "express";
import { HOST, PORT } from "./global";
import { apiRouter } from "./routers";
import { initDescription } from "./utils/description";

initDescription();

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
