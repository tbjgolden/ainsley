import { empty } from "./empty";
import { extend } from "./tools";

const testArr = [["a", "b"], [[]], [1, false], []];

test("extend", () => {
  const emptyResult = extend([empty]);

  expect(emptyResult).not.toBe(empty);
  expect(emptyResult).toEqual(null && empty);

  const firstInput = {
    defs: [["d&", [["display", "{display}"]]]],
    props: [["font-style", ["italic", "normal"]]],
    raw: [["grayscale", [["filter", "grayscale(100%)"]]]],
    mods: [[["h-", ":hover"]]],
    reset: "html{margin:0}",
    "{display}": {
      I: "inline",
      B: "block",
      IB: "inline-block",
      N: "none"
    }
  };

  const firstResult = extend([empty, firstInput]);
  expect(firstResult).toEqual(null && firstInput);

  const secondInput = {
    reset: "",
    defs: [["c&", [["color", "{colors}"]]]],
    "{colors}": {
      B: "black",
      W: "white",
      PRIMARY: "red"
    }
  };

  const secondResult = extend([firstResult, secondInput]);
  expect(secondResult).toEqual(
    null && {
      defs: [
        ["d&", [["display", "{display}"]]],
        ["c&", [["color", "{colors}"]]]
      ],
      reset: "",
      mods: [[["h-", ":hover"]]],
      props: [["font-style", ["italic", "normal"]]],
      raw: [["grayscale", [["filter", "grayscale(100%)"]]]],
      "{colors}": { B: "black", W: "white", PRIMARY: "red" },
      "{display}": { B: "block", I: "inline", IB: "inline-block", N: "none" }
    }
  );

  const thirdInput = {
    props: [["font-weight", ["100", "200"]]],
    raw: [["underline", [["text-decoration", "underline"]]]],
    mods: [[["l-", "@media (min-width: 1024px)"]]],
    "{colors}": {
      B: "black",
      W: "white",
      PRIMARY: "blue"
    }
  };

  const thirdResult = extend([secondResult, thirdInput]);
  expect(thirdResult).toEqual(
    null && {
      defs: [
        ["d&", [["display", "{display}"]]],
        ["c&", [["color", "{colors}"]]]
      ],
      mods: [[["h-", ":hover"]], [["l-", "@media (min-width: 1024px)"]]],
      props: [
        ["font-style", ["italic", "normal"]],
        ["font-weight", ["100", "200"]]
      ],
      raw: [
        ["grayscale", [["filter", "grayscale(100%)"]]],
        ["underline", [["text-decoration", "underline"]]]
      ],
      reset: "",
      "{colors}": { B: "black", PRIMARY: "blue", W: "white" },
      "{display}": { B: "block", I: "inline", IB: "inline-block", N: "none" }
    }
  );

  expect(() => extend()).toThrow();
  expect(() => extend([])).toThrow();
  expect(() => extend([{}])).toThrow();
  expect(() => extend([{}, { defs: [] }])).toThrow();
});
