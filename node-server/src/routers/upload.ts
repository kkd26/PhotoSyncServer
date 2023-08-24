import { Router } from "express";
import { addPhotoAndWrite } from "../utils/description";
import { getHash } from "../utils/file";
import { upload } from "../utils/upload";
import { createThumbnail } from "../utils/thumbnail";

export const uploadRouter = Router();

uploadRouter.post("/", upload.single("image"), (req, res) => {
  const { file } = req;
  console.log(file);

  if (!file) return res.sendStatus(304);
  res.sendStatus(201);

  const { destination, path } = file;
  const hash = getHash(path);
  const { albumTitle, date } = req.body;

  createThumbnail(path, albumTitle, hash);

  addPhotoAndWrite(destination, hash, date);
});
