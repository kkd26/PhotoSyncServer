import {
  Description,
  addPhoto,
  areDescEqual,
  toDescription,
  toString,
} from "./description";

describe("Description to string", () => {
  test("toString1", () => {
    const initDesc: Description = {
      dir1: new Map([["hash1", 0]]),
      dir2: new Map([["hash2", 1]]),
    };
    const expectedString = `{"dir1":[["hash1",0]],"dir2":[["hash2",1]]}`;
    expect(toString(initDesc)).toBe(expectedString);
  });
  test("toString2", () => {
    const initDesc: Description = {
      dir1: new Map([["hash1", 0]]),
      dir2: new Map([
        ["hash2", 1],
        ["hash3", 2],
      ]),
    };
    const expectedString = `{"dir1":[["hash1",0]],"dir2":[["hash2",1],["hash3",2]]}`;
    expect(toString(initDesc)).toBe(expectedString);
  });
  test("toString3", () => {
    const initDesc: Description = {
      dir2: new Map([
        ["hash3", 2],
        ["hash2", 1],
      ]),
      dir1: new Map([["hash1", 0]]),
    };
    const expectedString = `{"dir2":[["hash3",2],["hash2",1]],"dir1":[["hash1",0]]}`;
    expect(toString(initDesc)).toBe(expectedString);
  });
  test("toString4", () => {
    const initDesc: Description = {};
    const expectedString = `{}`;
    expect(toString(initDesc)).toBe(expectedString);
  });
});

describe("Two equal descriptions", () => {
  test("areDescEqual1", () => {
    const desc1: Description = {
      dir1: new Map([["hash1", 0]]),
      dir2: new Map([
        ["hash2", 1],
        ["hash3", 2],
      ]),
    };
    const desc2: Description = {
      dir2: new Map([
        ["hash3", 2],
        ["hash2", 1],
      ]),
      dir1: new Map([["hash1", 0]]),
    };
    expect(areDescEqual(desc1, desc2));
  });
  test("areDescEqual2", () => {
    const desc1: Description = {};
    const desc2: Description = {};
    expect(areDescEqual(desc1, desc2));
  });
  test("areDescEqual3", () => {
    const desc1: Description = {
      dir1: new Map([
        ["hash1", 0],
        ["hash4", 3],
      ]),
      dir2: new Map([
        ["hash2", 1],
        ["hash3", 2],
      ]),
    };
    const desc2: Description = {
      dir2: new Map([
        ["hash3", 2],
        ["hash2", 1],
      ]),
      dir1: new Map([["hash1", 0]]),
    };
    expect(areDescEqual(desc1, desc2)).toBeFalsy();
  });
  test("areDescEqual3", () => {
    const desc1: Description = {
      dir1: new Map([["hash1", 0]]),
      dir2: new Map([
        ["hash2", 1],
        ["hash3", 2],
      ]),
    };
    const desc2: Description = {
      dir2: new Map([
        ["hash3", 2],
        ["hash2", 1],
        ["hash4", 3],
      ]),
      dir1: new Map([["hash1", 0]]),
    };
    expect(areDescEqual(desc1, desc2)).toBeFalsy();
  });
});

describe("String to description", () => {
  test("toDescription1", () => {
    const initString = `{"dir1":[["hash1",0]],"dir2":[["hash2",1]]}`;
    const desc: Description = {
      dir1: new Map([["hash1", 0]]),
      dir2: new Map([["hash2", 1]]),
    };
    const expectedDesc = toDescription(initString);
    expect(areDescEqual(desc, expectedDesc));
  });
  test("toDescription2", () => {
    const initString = `{"dir1":[["hash1",0]],"dir2":[["hash2",1]]}`;
    const desc: Description = {
      dir2: new Map([["hash2", 1]]),
      dir1: new Map([["hash1", 0]]),
    };
    const expectedDesc = toDescription(initString);
    expect(areDescEqual(desc, expectedDesc));
  });
  test("toDescription3", () => {
    const initString = `{}`;
    const desc: Description = {};
    const expectedDesc = toDescription(initString);
    expect(areDescEqual(desc, expectedDesc));
  });
});

describe("Add hash", () => {
  test("addHash1", () => {
    const desc: Description = {
      dir1: new Map([["hash1", 0]]),
      dir2: new Map([["hash2", 1]]),
    };
    const newHash = "hash3";
    const newDate = 2;
    const dir = "dir2";
    const expectedDesc: Description = {
      dir1: new Map([["hash1", 0]]),
      dir2: new Map([
        ["hash2", 1],
        ["hash3", 2],
      ]),
    };
    const outputDesc = addPhoto(dir, newHash, newDate, desc);
    expect(areDescEqual(expectedDesc, outputDesc));
  });
  test("addHash2", () => {
    const desc: Description = {};
    const newHash = "hash3";
    const newDate = 2;
    const dir = "dir2";
    const expectedDesc: Description = {
      dir2: new Map([["hash3", 2]]),
    };
    const outputDesc = addPhoto(dir, newHash, newDate, desc);
    expect(areDescEqual(expectedDesc, outputDesc));
  });
  test("addHash3", () => {
    const desc: Description = {
      dir1: new Map([["hash1", 0]]),
      dir2: new Map([["hash2", 1]]),
    };
    const newHash = "hash1";
    const newDate = 0;
    const dir = "dir1";
    const expectedDesc: Description = {
      dir1: new Map([["hash1", 0]]),
      dir2: new Map([["hash2", 1]]),
    };
    const outputDesc = addPhoto(dir, newHash, newDate, desc);
    expect(areDescEqual(expectedDesc, outputDesc));
  });
});
