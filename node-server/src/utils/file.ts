import crypto from "crypto";
import fs from "fs";

export const getDirectories = (path: string) => {
  try {
    return fs
      .readdirSync(path)
      .filter((file) => {
        return fs.statSync(path + "/" + file).isDirectory();
      })
      .map((dir) => path + "/" + dir);
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getFiles = (path: string) => {
  try {
    return fs
      .readdirSync(path)
      .filter((file) => {
        return fs.statSync(path + "/" + file).isFile();
      })
      .map((dir) => path + "/" + dir);
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getHash = (path: string) => {
  try {
    const fileBuffer = fs.readFileSync(path);
    const hashSum = crypto.createHash("sha256");
    hashSum.update(fileBuffer);
    return hashSum.digest("hex");
  } catch (err) {
    console.error(err);
    return "";
  }
};

export const createDirectory = (path: string): boolean => {
  try {
    if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true });
    else if (!fs.statSync(path).isDirectory()) return false;
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
