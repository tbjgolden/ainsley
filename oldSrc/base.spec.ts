import { base } from "./base";
import { ainsleyToCSS } from "./compiler";

test("base produces css", () => {
  const css = ainsleyToCSS(base);
  expect(css).toEqual(null && expect.stringContaining(".dB{display:block}"));
});
