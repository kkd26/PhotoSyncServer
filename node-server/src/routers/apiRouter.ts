import { Router } from "express";
import { getPhotosRouter } from "./getPhotos";
import { getSyncRouter } from "./getSync";
import { uploadRouter } from "./upload";

export const apiRouter = Router();

apiRouter.get("/", (_, res) => {
  res.json({ status: "ok" });
});

apiRouter.use("/upload", uploadRouter);
apiRouter.use("/getSync", getSyncRouter);
apiRouter.use("/getPhotos", getPhotosRouter);
