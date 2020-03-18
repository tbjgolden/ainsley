import lint from "./lint";
import { base, empty } from "./tools";

test("base produces no errors", () => {
  expect(lint(base)).toEqual(null);
});

test("empty produces no errors", () => {
  expect(lint(empty)).toEqual(null);
});

test("invalid defs produces error", () => {
  expect(lint({ ...empty, defs: null })).toContain('"defs" is invalid');
});
test("invalid props produces error", () => {
  expect(lint({ ...empty, props: null })).toContain('"props" is invalid');
});
test("invalid raw produces error", () => {
  expect(lint({ ...empty, raw: null })).toContain('"raw" is invalid');
});
test("invalid mods produces error", () => {
  expect(lint({ ...empty, mods: null })).toContain('"mods" is invalid');
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
    lint(circular).find(str =>
      str.startsWith("Error during lint: Converting circular structure to JSON")
    )
  ).toBeTruthy();
});
