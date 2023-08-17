import bodyParser from "body-parser";
import { Router } from "express";
import { isHashInDesc } from "../utils/description";

export const getSyncRouter = Router();

type GetSyncBodyType = { albumTitle: string; hashes: string[] };

getSyncRouter.post("/", bodyParser.json(), (req, res) => {
  const { albumTitle, hashes }: GetSyncBodyType = req.body;
  const hashesToSync = hashes.filter((hash) => !isHashInDesc(albumTitle, hash));
  res.status(200).json(hashesToSync);
});
