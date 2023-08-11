"use strict";

import express from "express";
import { DESCRIPTION, DIR, HOST, PORT, setDescription } from "./global";
import { apiRouter } from "./routers";
import { genDescription } from "./utils/file";

setDescription(genDescription(DIR));
console.log(DESCRIPTION);

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
