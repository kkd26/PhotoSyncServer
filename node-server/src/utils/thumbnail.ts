import sharp from "sharp";
import { DIR } from "../global";
import { createDirectory } from "./file";

export const createThumbnail = async (
  path: string,
  albumTitle: string,
  hash: string
) => {
  const directory = `${DIR}/.tmb/${albumTitle}`;
  const outputPath = `${directory}/${hash}`;

  createDirectory(directory);

  await sharp(path)
    .resize({
      width: 64,
      height: 64,
      fit: "contain",
    })
    .withMetadata()
    .sharpen()
    .toFile(outputPath);
};
