import { Router } from "express";
import { addHashAndWrite } from "../utils/description";
import { getHash } from "../utils/file";
import { upload } from "../utils/upload";

export const apiRouter = Router();

apiRouter.get("/", (_, res) => {
  res.send("Hello from your express.js");
});

apiRouter.post("/upload", upload.single("image"), (req, res) => {
  const { file } = req;
  console.log(file);

  if (!file) return res.sendStatus(304);

  const { destination, path } = file;
  const hash = getHash(path);

  res.sendStatus(201);
  addHashAndWrite(destination, hash);
});
