import { Router } from "express";
import { addPhotoAndWrite, getSorted } from "../utils/description";
import { getHash } from "../utils/file";
import { createThumbnail } from "../utils/thumbnail";
import { upload } from "../utils/upload";

export const uploadRouter = Router();

uploadRouter.post("/", upload.single("image"), async (req, res) => {
  const { file } = req;
  console.log(file);

  if (!file) return res.sendStatus(304);

  const { destination, path } = file;
  const hash = getHash(path);
  const { albumTitle, date } = req.body;

  await createThumbnail(path, albumTitle, hash);
  addPhotoAndWrite(destination, hash, date);

  res.status(201).json(getSorted(albumTitle));
});
