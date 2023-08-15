import multer from "multer";
import { DIR } from "../global";
import { isHashInDesc } from "./description";
import { createDirectory } from "./file";

const storage = multer.diskStorage({
  destination: (req, _, next) => {
    const { albumTitle } = req.body;
    const dest = `${DIR}/${albumTitle}`;
    if (createDirectory(dest)) next(null, dest);
    else next(new Error(`Unable to create directory ${albumTitle}`), dest);
  },
  filename: (_, file, next) => {
    const name = file.originalname.replace(/([^a-z0-9_. ]+)/gi, "-");
    next(null, name);
  },
});

export const upload = multer({
  storage,
  fileFilter: (req, _, cb) => {
    const { albumTitle, hash } = req.body;
    cb(null, !isHashInDesc(albumTitle, hash));
  },
});
