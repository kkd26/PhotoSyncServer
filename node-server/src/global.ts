export const PORT = 8080;
export const HOST = "0.0.0.0";
export const DIR = ".tmp";

export type Description = {
  [dir: string]: Set<string>;
};
export let DESCRIPTION: Description = {};
export const setDescription = (newDescription: Description): void => {
  DESCRIPTION = newDescription;
};
export const addHash = (dir: string, hash: string) => {
  if (dir in DESCRIPTION) DESCRIPTION[dir].add(hash);
  else DESCRIPTION[dir] = new Set([hash]);
};
