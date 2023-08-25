import bodyParser from "body-parser";
import { Router } from "express";
import { isHashInDesc } from "../utils/description";

export const checkHashesRouter = Router();

type CheckHashesBodyType = { albumTitle: string; hashes: string[] };

checkHashesRouter.post("/", bodyParser.json(), (req, res) => {
  const { albumTitle, hashes }: CheckHashesBodyType = req.body;
  const hashesToSync = hashes.filter((hash) => !isHashInDesc(albumTitle, hash));
  res.status(200).json(hashesToSync);
});
