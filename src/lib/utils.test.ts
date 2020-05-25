import { combinations } from "./utils";

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
