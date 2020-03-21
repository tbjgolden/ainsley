import { base } from "./base";
import { ainsleyToCSS, ainsleyInsert } from "./compiler";
const csstree = require("css-tree");

test("ainsleyToCSS on base produces css of an expected structure", () => {
  const validClassRegex = /^((?:[a-z]+-)*)([a-z]+)([A-Z0-9]+)$/;
  const validProperties = new Set([
    "align-content",
    "align-items",
    "align-self",
    "bottom",
    "border-bottom-color",
    "border-bottom-width",
    "background-color",
    "background-position",
    "background-repeat",
    "background-size",
    "border-left-color",
    "border-left-width",
    "border-radius",
    "border-right-color",
    "border-right-width",
    "box-shadow",
    "border-top-color",
    "border-top-width",
    "color",
    "cursor",
    "display",
    "font-family",
    "font-size",
    "font-style",
    "font-weight",
    "flex",
    "flex-direction",
    "flex-wrap",
    "height",
    "justify-content",
    "left",
    "line-height",
    "letter-spacing",
    "margin",
    "margin-bottom",
    "margin-left",
    "margin-right",
    "margin-top",
    "min-height",
    "min-width",
    "opacity",
    "overflow",
    "overflow-wrap",
    "position",
    "padding",
    "padding-bottom",
    "pointer-events",
    "padding-left",
    "padding-right",
    "padding-top",
    "right",
    "top",
    "text-align",
    "text-decoration",
    "transform-origin",
    "text-overflow",
    "text-shadow",
    "text-transform",
    "user-select",
    "visibility",
    "vertical-align",
    "width",
    "white-space",
    "word-wrap",
    "max-height",
    "max-width",
    "z-index"
  ]);

  let css = ainsleyToCSS(base);
  try {
    csstree.walk(csstree.parse(css), {
      visit: "Atrule",
      enter: ({ block }) => {
        css = csstree.generate(block).slice(1, -1);
        throw new Error("null");
      }
    });
  } catch (err) {}
  expect(css).not.toBe("");

  const invalidSelectors = [];
  csstree.walk(csstree.parse(css), {
    visit: "Selector",
    enter: node => {
      const { name, type } = node.children.head.data;
      if (type !== "ClassSelector" || !validClassRegex.test(name)) {
        invalidSelectors.push(csstree.generate(node.children.head.data));
      }
    }
  });
  expect(invalidSelectors).toEqual([]);

  const invalidProperties = [];
  csstree.walk(csstree.parse(css), {
    visit: "Declaration",
    enter: ({ property }) => {
      if (!validProperties.has(property)) {
        invalidSelectors.push(property);
      }
    }
  });
  expect(invalidSelectors).toEqual([]);
});

test("ainsleyInsert inserts rules into stylesheet", () => {
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

test("numbers lose their decimal points", () => {
  expect(
    ainsleyToCSS({
      props: [["Opacity", [0.1, 0.2]]]
    })
  ).toBe(".o01{opacity:0.1}.o02{opacity:0.2}");
});
