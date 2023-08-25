import { Router } from "express";
import { getSorted } from "../utils/description";

export const getSyncedHashesRouter = Router();

getSyncedHashesRouter.get("/:albumTitle", (req, res) => {
  const { albumTitle } = req.params;
  res.status(200).json(getSorted(albumTitle));
});
