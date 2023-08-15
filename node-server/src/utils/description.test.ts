import {
  Description,
  addHash,
  areDescEqual,
  toDescription,
  toString,
} from "./description";

describe("Description to string", () => {
  test("toString1", () => {
    const initDesc: Description = {
      dir1: new Set(["hash1"]),
      dir2: new Set(["hash2"]),
    };
    const expectedString = `{"dir1":["hash1"],"dir2":["hash2"]}`;
    expect(toString(initDesc)).toBe(expectedString);
  });
  test("toString2", () => {
    const initDesc: Description = {
      dir1: new Set(["hash1"]),
      dir2: new Set(["hash2", "hash3"]),
    };
    const expectedString = `{"dir1":["hash1"],"dir2":["hash2","hash3"]}`;
    expect(toString(initDesc)).toBe(expectedString);
  });
  test("toString3", () => {
    const initDesc: Description = {
      dir2: new Set(["hash3", "hash2"]),
      dir1: new Set(["hash1"]),
    };
    const expectedString = `{"dir2":["hash3","hash2"],"dir1":["hash1"]}`;
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
      dir1: new Set(["hash1"]),
      dir2: new Set(["hash2", "hash3"]),
    };
    const desc2: Description = {
      dir2: new Set(["hash3", "hash2"]),
      dir1: new Set(["hash1"]),
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
      dir1: new Set(["hash1", "hash4"]),
      dir2: new Set(["hash2", "hash3"]),
    };
    const desc2: Description = {
      dir2: new Set(["hash3", "hash2"]),
      dir1: new Set(["hash1"]),
    };
    expect(areDescEqual(desc1, desc2)).toBeFalsy();
  });
  test("areDescEqual3", () => {
    const desc1: Description = {
      dir1: new Set(["hash1"]),
      dir2: new Set(["hash2", "hash3"]),
    };
    const desc2: Description = {
      dir2: new Set(["hash3", "hash2", "hash4"]),
      dir1: new Set(["hash1"]),
    };
    expect(areDescEqual(desc1, desc2)).toBeFalsy();
  });
});

describe("String to description", () => {
  test("toDescription1", () => {
    const initString = `{"dir1":["hash1"],"dir2":["hash2"]}`;
    const desc: Description = {
      dir1: new Set(["hash1"]),
      dir2: new Set(["hash2"]),
    };
    const expectedDesc = toDescription(initString);
    expect(areDescEqual(desc, expectedDesc));
  });
  test("toDescription2", () => {
    const initString = `{"dir1":["hash1"],"dir2":["hash2"]}`;
    const desc: Description = {
      dir2: new Set(["hash2"]),
      dir1: new Set(["hash1"]),
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
      dir1: new Set(["hash1"]),
      dir2: new Set(["hash2"]),
    };
    const newHash = "hash3";
    const dir = "dir2";
    const expectedDesc: Description = {
      dir1: new Set(["hash1"]),
      dir2: new Set(["hash2", "hash3"]),
    };
    const outputDesc = addHash(dir, newHash, desc);
    expect(areDescEqual(expectedDesc, outputDesc));
  });
  test("addHash2", () => {
    const desc: Description = {};
    const newHash = "hash3";
    const dir = "dir2";
    const expectedDesc: Description = {
      dir2: new Set(["hash3"]),
    };
    const outputDesc = addHash(dir, newHash, desc);
    expect(areDescEqual(expectedDesc, outputDesc));
  });
  test("addHash3", () => {
    const desc: Description = {
      dir1: new Set(["hash1"]),
      dir2: new Set(["hash2"]),
    };
    const newHash = "hash1";
    const dir = "dir1";
    const expectedDesc: Description = {
      dir1: new Set(["hash1"]),
      dir2: new Set(["hash2"]),
    };
    const outputDesc = addHash(dir, newHash, desc);
    expect(areDescEqual(expectedDesc, outputDesc));
  });
});
