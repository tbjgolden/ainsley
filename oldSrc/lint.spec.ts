import { lint } from "./lint";
import { base } from "./base";
import { empty } from "./empty";

test("base produces no errors", () => {
  expect(lint(base)).toEqual(null && null);
});

test("empty produces no errors", () => {
  expect(lint(empty)).toEqual(null && null);
});

describe("types", () => {
  test("defs", () => {
    expect(lint({ ...empty, defs: null })).toContain(
      '"defs" is invalid: expected null to be Array'
    );
    expect(lint({ ...empty, defs: [] })).toBe(null);
    expect(lint({ ...empty, defs: {} })).toContain(
      '"defs" is invalid: expected Object to be Array'
    );
    expect(lint({ ...empty, defs: [[]] })).toContain(
      '"defs" is invalid: expected Array to be non-empty array'
    );
    expect(lint({ ...empty, defs: [[null, "aA"]] })).toContain(
      '"defs" is invalid: expected null to be non-empty string'
    );
    expect(lint({ ...empty, defs: [["aA", null]] })).toContain(
      '"defs" is invalid: expected null to be non-empty array'
    );
    expect(lint({ ...empty, defs: [["aA", "b"]] })).toContain(
      '"defs" is invalid: expected "b" to be non-empty array'
    );
    expect(lint({ ...empty, defs: [["aA", ["a", "a"]]] })).toContain(
      '"defs" is invalid: expected Array to be non-empty array'
    );
    expect(lint({ ...empty, defs: [["aA", [["a", "a"]]]] })).toBe(null);
  });

  test("props", () => {
    expect(lint({ ...empty, props: null })).toContain(
      '"props" is invalid: expected null to be Array'
    );
    expect(lint({ ...empty, props: [] })).toBe(null);
    expect(lint({ ...empty, props: {} })).toContain(
      '"props" is invalid: expected Object to be Array'
    );
    expect(lint({ ...empty, props: [["aA"]] })).toContain(
      '"props" is invalid: assert failed'
    );
    expect(lint({ ...empty, props: [["aA", "aA"]] })).toContain(
      '"props" is invalid: assert failed'
    );
    expect(lint({ ...empty, props: [["aA", []]] })).toContain(
      '"props" is invalid: assert failed'
    );
    expect(lint({ ...empty, props: [["aA", ["aA"]]] })).toBe(null);
    expect(lint({ ...empty, props: [["aA", [0, 1]]] })).toBe(null);
    expect(lint({ ...empty, props: [["aA", [false]]] })).toContain(
      '"props" is invalid: assert failed'
    );
    expect(lint({ ...empty, props: [["aA", {}]] })).toContain(
      '"props" is invalid: assert failed'
    );
    expect(lint({ ...empty, props: [["A", { 2: 1, A: "b" }]] })).toBe(null);
  });

  test("raw", () => {
    expect(lint({ ...empty, raw: null })).toContain(
      '"raw" is invalid: expected null to be Array'
    );
    expect(lint({ ...empty, raw: [] })).toBe(null);
    expect(lint({ ...empty, raw: {} })).toContain(
      '"raw" is invalid: expected Object to be Array'
    );
    expect(lint({ ...empty, raw: [[]] })).toContain(
      '"raw" is invalid: expected Array to be non-empty array'
    );
    expect(lint({ ...empty, raw: [[null, "aA"]] })).toContain(
      '"raw" is invalid: expected null to be non-empty string'
    );
    expect(lint({ ...empty, raw: [["aA", null]] })).toContain(
      '"raw" is invalid: expected null to be non-empty array'
    );
    expect(lint({ ...empty, raw: [["aA", "b"]] })).toContain(
      '"raw" is invalid: expected "b" to be non-empty array'
    );
    expect(lint({ ...empty, raw: [["bC", ["b", "c"]]] })).toContain(
      '"raw" is invalid: expected Array to be non-empty array'
    );
    expect(lint({ ...empty, raw: [["bC", [["b", "c"]]]] })).toBe(null);
    expect(lint({ ...empty, raw: [["b1", [["b", 1]]]] })).toBe(null);
  });

  test("mods", () => {
    expect(lint({ ...empty, mods: null })).toContain(
      '"mods" is invalid: expected null to be Array'
    );
    expect(lint({ ...empty, mods: {} })).toContain(
      '"mods" is invalid: expected Object to be Array'
    );
    expect(lint({ ...empty, mods: [[]] })).toContain(
      '"mods" is invalid: expected Array to be non-empty array'
    );
    expect(lint({ ...empty, mods: [[null, "aA"]] })).toContain(
      '"mods" is invalid: expected Array to be non-empty array'
    );
    expect(lint({ ...empty, mods: [["aA", null]] })).toContain(
      '"mods" is invalid: expected Array to be non-empty array'
    );
    expect(lint({ ...empty, mods: [["aA", "b"]] })).toContain(
      '"mods" is invalid: expected Array to be non-empty array'
    );
    expect(lint({ ...empty, mods: [["aA", ["b", "c"]]] })).toContain(
      '"mods" is invalid: expected Array to be non-empty array'
    );
    expect(lint({ ...empty, mods: [["aA", [["b", "c"]]]] })).toContain(
      '"mods" is invalid: expected Array to be non-empty array'
    );

    expect(lint({ ...empty, mods: [] })).toBe(null);
    expect(lint({ ...empty, mods: [[[]]] })).toContain(
      '"mods" is invalid: expected Array to be non-empty array'
    );
    expect(lint({ ...empty, mods: [[["aA"]]] })).toContain(
      '"mods" is invalid: expected Array to have length 2'
    );
    expect(lint({ ...empty, mods: [[["aA", "b", "c"]]] })).toContain(
      '"mods" is invalid: expected Array to have length 2'
    );
    expect(lint({ ...empty, mods: [[["aA", "b"]]] })).toBe(null);
    expect(lint({ ...empty, mods: [[["aA", ""]]] })).toContain(
      '"mods" is invalid: expected "" to be non-empty string'
    );
    expect(
      lint({
        ...empty,
        mods: [
          [
            ["aA", "b"],
            ["aA", "b"],
            ["aA", "b"]
          ]
        ]
      })
    ).toBe(null);
    expect(
      lint({
        ...empty,
        mods: [
          [
            ["aA", "b"],
            ["aA", "b"],
            ["aA", "b"]
          ],
          [
            ["aA", "b"],
            ["aA", "b"]
          ]
        ]
      })
    ).toBe(null);
    expect(
      lint({
        ...empty,
        mods: [
          [
            ["aA", "b"],
            ["aA", "b"],
            ["aA", "b"]
          ],
          []
        ]
      })
    ).toContain('"mods" is invalid: expected Array to be non-empty array');
  });

  test("reset", () => {
    expect(lint({ ...empty, reset: null })).toBe(null);
    expect(lint({ ...empty, reset: undefined })).toBe(null);
    expect(lint({ ...empty, reset: "" })).toBe(null);
    expect(lint({ ...empty, reset: [] })).toContain(
      '"reset" is invalid: expected Array maybe to be String'
    );
    expect(lint({ ...empty, reset: "html,body{margin:0}" })).toBe(null);
  });

  test("iterator", () => {
    expect(lint({ ...empty, "{iterator}": null })).toContain(
      '"{iterator}" is invalid: assert failed'
    );
    expect(lint({ ...empty, "{iterator}": [] })).toContain(
      '"{iterator}" is invalid: assert failed'
    );
    expect(lint({ ...empty, "{iterator}": {} })).toContain(
      '"{iterator}" is invalid: assert failed'
    );
    expect(lint({ ...empty, "{iterator}": ["aA"] })).not.toContain(
      '"{iterator}" is invalid: assert failed'
    );
    expect(lint({ ...empty, "{iterator}": [0, 1] })).not.toContain(
      '"{iterator}" is invalid: assert failed'
    );
    expect(lint({ ...empty, "{iterator}": [false] })).toContain(
      '"{iterator}" is invalid: assert failed'
    );
    expect(lint({ ...empty, "{iterator}": {} })).toContain(
      '"{iterator}" is invalid: assert failed'
    );
    expect(lint({ ...empty, "{iterator}": { 2: 1, a: "b" } })).not.toContain(
      '"{iterator}" is invalid: assert failed'
    );
  });
});

test("ainsley contains an unused iterator", () => {
  expect(
    lint({
      ...empty,
      "{someRandomIterator}": {
        a: "1",
        b: "2"
      }
    })
  ).toContain('iterator {someRandomIterator} defined but not used in "defs"');
});

test("ainsley contains references an iterator that doesn't exist", () => {
  expect(
    lint({
      ...empty,
      defs: [["&", [["prop", "{someRandomIterator}"]]]]
    })
  ).toContain(
    'iterator {someRandomIterator} referenced in "defs" but not defined'
  );
});

test("ainsley contains an invalid object", () => {
  expect(
    lint({
      ...empty,
      hey: [["&", [["prop", "{someRandomIterator}"]]]]
    })
  ).toContain('invalid property "hey" found');
});

test("handles an error during linting gracefully", () => {
  const circular = { ...empty };
  circular.defs = circular;

  expect(
    lint(circular).find((str) =>
      str.startsWith("Error during lint: Converting circular structure to JSON")
    )
  ).toBeTruthy();
});
