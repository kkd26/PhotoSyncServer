import multer from "multer";
import { DIR } from "../global";
import { createDirectory } from "./file";

const storage = multer.diskStorage({
  destination: (req, _, next) => {
    const { albumTitle } = req.body;
    const dest = `${DIR}/${albumTitle}`;
    if (createDirectory(dest)) next(null, dest);
    else next(new Error(`Unable to create directory ${albumTitle}`), dest);
  },
  filename: (_, file, next) => {
    next(null, file.originalname);
  },
});

export const upload = multer({ storage });
