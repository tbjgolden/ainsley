/**
 * @jest-environment jsdom
 */

import base from "./base";
import { ainsleyToCSS, ainsleyInsert } from "./compiler";

test("base produces css", () => {
  const stylesheet = { insertRule: jest.fn() };

  ainsleyInsert(base, stylesheet);
  expect(stylesheet.insertRule).toHaveBeenCalledWith(
    expect.stringContaining(".dN{display:none}"),
    0
  );
});

test("empty produces empty string", () => {
  expect(ainsleyToCSS({})).toBe("");
});
