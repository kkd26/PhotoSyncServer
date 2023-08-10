import { Router } from "express";
import multer from "multer";

export const apiRouter = Router();
const upload = multer({ dest: ".tmp/" });

apiRouter.get("/", (req, res) => {
  res.send("Hello from your express.js");
});

apiRouter.post("/upload", upload.single("some-file"), (req, res) => {
  const file = req.file;

  console.log(file);
  res.sendStatus(200);
});
