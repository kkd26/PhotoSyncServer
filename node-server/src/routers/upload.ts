import { Router } from "express";
import { addPhotoAndWrite } from "../utils/description";
import { getHash } from "../utils/file";
import { upload } from "../utils/upload";

export const uploadRouter = Router();

uploadRouter.post("/", upload.single("image"), (req, res) => {
  const { file } = req;
  console.log(file);

  if (!file) return res.sendStatus(304);

  const { destination, path } = file;
  const hash = getHash(path);
  const date = req.body.date;

  res.sendStatus(201);
  addPhotoAndWrite(destination, hash, date);
});
