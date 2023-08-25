import { Router } from "express";
import fs from "fs";
import { DIR } from "../global";
import { setDescription, writeDesc } from "../utils/description";
import { getDirectories } from "../utils/file";

export const deleteAllRouter = Router();

deleteAllRouter.get("/", (req, res) => {
  const directories = getDirectories(DIR);

  directories.forEach((dir) =>
    fs.rmSync(dir, { recursive: true, force: true })
  );

  setDescription({});
  writeDesc();

  res.sendStatus(200);
});
