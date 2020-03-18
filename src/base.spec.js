import base from "./base";
import { ainsleyToCSS } from "./compiler";

test("base produces css", () => {
  const css = ainsleyToCSS(base);
  expect(css).toEqual(expect.stringContaining(".dB{display:block}"));
});
