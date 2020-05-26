import { tachyonsAinsley } from "./ainsley";
import csstree from "css-tree";
import csso from "csso";
import fs from "fs";
import path from "path";

const rules = new Map();
const ast = csstree.parse(
  csso.minify(fs.readFileSync(require.resolve("tachyons"), "utf8")).css
);
csstree.walk(ast, {
  visit: "Rule",
  enter(node) {
    if (node.prelude.type === "SelectorList") {
      const sels = node.prelude.children.toArray();
      const decls = node.block.children.toArray();

      sels.forEach((selectorNode) => {
        const selector = csstree.generate(selectorNode);

        if (rules.get(selector) === undefined)
          rules.set(selector, new Map<string, number>());

        const selectorSet = rules.get(selector);
        decls.forEach((node) => {
          if (node.type === "Declaration") {
            const value = csstree.generate(node.value);
            selectorSet.set(`${node.property}:${value}`, 0);
          }
        });
      });
    }
  }
});

const isInSelectorWhitelist = (selector: string) => {
  return /^\.(bg-(top|left|right|bottom|center)|debug|flex-auto|fr|pointer:hover$)/.test(
    selector
  );
};

describe("tachyons ainsley", () => {
  test("check that it's a valid superset", async () => {
    let lastSelector = "";

    const selectors = new Set();
    const tachyons = await tachyonsAinsley();
    fs.writeFileSync(path.join(__dirname, "result.css"), tachyons);
    const ast = csstree.parse(csso.minify(tachyons).css);
    csstree.walk(ast, {
      visit: "Rule",
      enter(node) {
        if (node.prelude.type === "SelectorList") {
          const decls = node.block.children.toArray();
          node.prelude.children.toArray().forEach((selectorNode) => {
            const selector = csstree.generate(selectorNode);
            selectors.add(selector);
            lastSelector = selector;
            if (rules.get(selector) === undefined) {
              return;
            }
            const selectorMap = rules.get(selector) as Map<string, number>;
            decls.forEach((node) => {
              if (node.type === "Declaration") {
                const prop = node.property;
                const val = csstree.generate(node.value);
                const key = `${prop}:${val}`;
                const prev = selectorMap.get(key);
                if (prev === undefined) {
                  if (!isInSelectorWhitelist(selector)) {
                    console.log(selector, key, selectorMap);
                    throw new Error(
                      `Could not find declaration "${key}" on selector "${selector}"`
                    );
                  }
                } else {
                  selectorMap.set(key, prev + 1);
                }
              }
            });
          });
        }
      }
    });

    // reached end
    expect(lastSelector).toEqual(".hover-z-unset-l:focus");
    const missingRules = [];
    for (const [selector, declarations] of rules) {
      for (const [declaration, count] of declarations) {
        if (count < 1) {
          if (
            !isInSelectorWhitelist(selector) &&
            !["abbr[title]"].includes(selector) &&
            !["_", "-webkit-", "-moz-", "backface-visibility"].some((prefix) =>
              declaration.startsWith(prefix)
            ) &&
            declaration.indexOf("-webkit-") === -1
          ) {
            missingRules.push(`${selector} { ...; ${declaration}; ... }`);
          }
        }
      }
    }

    expect(missingRules).toEqual([]);
  });
});
