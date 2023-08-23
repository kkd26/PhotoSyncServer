import fs from "fs";
import { DESC_PATH, DIR } from "../global";
import { createDirectory, getDirectories, getFiles, getHash } from "./file";

type Photo = number;

export type Description = {
  [dir: string]: Map<string, Photo>;
};

let DESCRIPTION: Description = {};

export const getSorted = (albumTitle: string): string[] => {
  const dir = `${DIR}/${albumTitle}`;
  if (dir in DESCRIPTION) {
    const map = [...DESCRIPTION[dir]];
    const sorted = map.sort(
      ([_hash1, date1], [_hash2, date2]) => date2 - date1
    );
    return sorted.map(([hash, date]) => hash);
  }
  return [];
};

export const logDescription = () => {
  console.log(DESCRIPTION);
};

const areMapsEqual = (a: Map<any, any>, b: Map<any, any>) =>
  a.size === b.size &&
  Array.from(a.keys()).every((key) => a.get(key) === b.get(key));

export const areDescEqual = (a: Description, b: Description) => {
  if (Object.keys(a).length !== Object.keys(b).length) return false;

  return Object.keys(a).every((dir) => {
    if (dir in b) return areMapsEqual(a[dir], b[dir]);
    return false;
  });
};

export const setDescription = (newDescription: Description): void => {
  DESCRIPTION = newDescription;
};

export const toString = (description: Description = DESCRIPTION): string => {
  const stringDesc: { [dir: string]: [string, number][] } = {};
  Object.keys(description).forEach((dir) => {
    stringDesc[dir] = [...description[dir]];
  });
  return JSON.stringify(stringDesc);
};

export const toDescription = (stringDescription: string): Description => {
  const desc: Description = {};
  const obj = JSON.parse(stringDescription);
  Object.keys(obj).forEach((dir) => {
    desc[dir] = new Map(obj[dir]);
  });
  return desc;
};

export const addPhoto = (
  dir: string,
  hash: string,
  photo: Photo,
  description: Description = DESCRIPTION
) => {
  if (dir in description) description[dir].set(hash, photo);
  else description[dir] = new Map([[hash, photo]]);
  return description;
};

export const writeDesc = (description: Description = DESCRIPTION) => {
  createDirectory(DIR);
  const path = DIR + "/" + DESC_PATH;
  fs.writeFileSync(path, toString(description));
};

export const readDesc = (): Description => {
  try {
    const path = DIR + "/" + DESC_PATH;
    const stringDesc = fs.readFileSync(path, "utf8");
    return toDescription(stringDesc);
  } catch (err) {
    console.error(err);
    return {};
  }
};

export const addPhotoAndWrite = (dir: string, hash: string, photo: Photo) => {
  writeDesc(addPhoto(dir, hash, photo));
};

export const isHashInDesc = (albumTitle: string, hash: string) => {
  const dir = `${DIR}/${albumTitle}`;
  if (dir in DESCRIPTION && DESCRIPTION[dir].has(hash)) return true;
  return false;
};

export const genDescription = (): Description => {
  const description: Description = {};

  getDirectories(DIR).map(
    (dir) =>
      (description[dir] = new Map<string, Photo>(
        getFiles(dir).map(({ file, date }) => [getHash(file), date])
      ))
  );

  return description;
};

export const initDescription = () => {
  //const desc1 = genDescription();
  const desc1 = readDesc();

  // if (!areDescEqual(desc1, desc2)) {
  //   console.error("Descriptions are different");
  //   writeDesc(desc1);
  // }

  setDescription(desc1);
};
