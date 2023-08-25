import { Router } from "express";
import { checkHashesRouter } from "./checkHashes";
import { deleteAllRouter } from "./deleteAllRouter";
import { getSyncedHashesRouter } from "./getSyncedHashes";
import { uploadRouter } from "./upload";

export const apiRouter = Router();

apiRouter.get("/", (_, res) => {
  res.json({ status: "ok" });
});

apiRouter.use("/upload", uploadRouter);
apiRouter.use("/checkHashes", checkHashesRouter);
apiRouter.use("/getSyncedHashes", getSyncedHashesRouter);

apiRouter.use("/deleteAll", deleteAllRouter);
