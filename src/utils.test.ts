import copy from "fast-copy";
import { map, flat, combinations, assign, toString } from "./utils";

const testArr = [["a", "b"], [[]], [1, false], []];

test("flat", () => {
  const ogTestArr = copy(testArr);
  const result = flat(testArr);

  expect(result).not.toBe(ogTestArr);
  expect(result).toEqual(["a", "b", [], 1, false]);
  expect(testArr).toEqual(ogTestArr);
});

test("map", () => {
  const ogTestArr = copy(testArr);
  const result = map(ogTestArr, (el) => [...el, "sup"]);

  expect(result).not.toBe(ogTestArr);
  expect(result).toEqual([
    ["a", "b", "sup"],
    [[], "sup"],
    [1, false, "sup"],
    ["sup"]
  ]);
});

test("combinations", () => {
  const ogTestArr = [
    [1, 2],
    [3, 4],
    [5, 6, 7]
  ];
  const result = combinations(ogTestArr);

  expect(result).not.toBe(ogTestArr);
  expect(result).toEqual([
    [1, 3, 5],
    [2, 3, 5],
    [1, 4, 5],
    [2, 4, 5],
    [1, 3, 6],
    [2, 3, 6],
    [1, 4, 6],
    [2, 4, 6],
    [1, 3, 7],
    [2, 3, 7],
    [1, 4, 7],
    [2, 4, 7]
  ]);
  expect(combinations([])).toEqual([[]]);
  expect(combinations([[1], [2], [3]])).toEqual([[1, 2, 3]]);
});

test("assign", () => {
  const a = { x: 1 };
  const b = { y: 2, z: 3 };
  const c = { z: 4 };
  const d = [a, b, c];
  const e = [a];

  const result = assign(d);
  const result2 = assign(e);

  expect(result).not.toBe(a);
  expect(result).not.toBe(b);
  expect(result).not.toBe(c);
  expect(result).not.toBe(d);
  expect(result).toEqual({ x: 1, y: 2, z: 4 });
  expect(result2).not.toBe(e);
  expect(result2).toEqual(a);
});

test("toString", () => {
  expect(toString(1)).toBe("1");
  expect(toString("1")).toBe("1");
});
