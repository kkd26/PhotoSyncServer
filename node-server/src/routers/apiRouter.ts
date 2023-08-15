import bodyParser from "body-parser";
import { Router } from "express";
import {
  addHashAndWrite,
  isHashInDesc
} from "../utils/description";
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

type GetSyncBodyType = { albumTitle: string; hashes: string[] };

apiRouter.post("/getSync", bodyParser.json(), (req, res) => {
  const { albumTitle, hashes }: GetSyncBodyType = req.body;
  const hashesToSync = hashes.filter((hash) => !isHashInDesc(albumTitle, hash));
  res.status(200).json(hashesToSync);
});
