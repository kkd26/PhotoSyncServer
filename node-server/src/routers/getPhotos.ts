import { Router } from "express";
import { getSorted } from "../utils/description";

export const getPhotosRouter = Router();

getPhotosRouter.get("/:albumTitle", (req, res) => {
  const { albumTitle } = req.params;
  res.status(200).json(getSorted(albumTitle));
});
