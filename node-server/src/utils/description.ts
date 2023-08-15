import fs from "fs";
import { DESC_PATH, DIR } from "../global";
import { createDirectory, getDirectories, getFiles, getHash } from "./file";

export type Description = {
  [dir: string]: Set<string>;
};

let DESCRIPTION: Description = {};

export const logDescription = () => {
  console.log(DESCRIPTION);
};

const areSetsEqual = (a: Set<any>, b: Set<any>) =>
  a.size === b.size && [...a].every((value) => b.has(value));

export const areDescEqual = (a: Description, b: Description) => {
  if (Object.keys(a).length !== Object.keys(b).length) return false;

  return Object.keys(a).every((dir) => {
    if (dir in b) return areSetsEqual(a[dir], b[dir]);
    return false;
  });
};

export const setDescription = (newDescription: Description): void => {
  DESCRIPTION = newDescription;
};

export const toString = (description: Description = DESCRIPTION): string => {
  const stringDesc: { [dir: string]: string[] } = {};
  Object.keys(description).forEach((dir) => {
    stringDesc[dir] = [...description[dir]];
  });
  return JSON.stringify(stringDesc);
};

export const toDescription = (stringDescription: string): Description => {
  const desc: Description = {};
  const obj = JSON.parse(stringDescription);
  Object.keys(obj).forEach((dir) => {
    desc[dir] = new Set(obj[dir]);
  });
  return desc;
};

export const addHash = (
  dir: string,
  hash: string,
  description: Description = DESCRIPTION
) => {
  if (dir in description) description[dir].add(hash);
  else description[dir] = new Set([hash]);
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

export const addHashAndWrite = (dir: string, hash: string) => {
  writeDesc(addHash(dir, hash));
};

export const isHashInDesc = (dir: string, hash: string) => {
  if (dir in DESCRIPTION && DESCRIPTION[dir].has(hash)) return true;
  return false;
};

export const genDescription = (): Description => {
  const description: Description = {};

  getDirectories(DIR).map(
    (dir) =>
      (description[dir] = new Set<string>(
        getFiles(dir).map((file) => getHash(file))
      ))
  );

  return description;
};

export const initDescription = () => {
  const desc1 = genDescription();
  const desc2 = readDesc();

  if (!areDescEqual(desc1, desc2)) {
    console.error("Descriptions are different");
    writeDesc(desc1);
  }

  setDescription(desc2);
};
