const { ainsleyToCss } = require("../dist/compiler.cjs.js");
const { extend } = require("../dist/extend.cjs.js");
const csstree = require("css-tree");
const fs = require("fs");
const path = require("path");

const abbrMap = fs
  .readFileSync(path.join(__dirname, "../research/propMap.txt"), "utf8")
  .split("\n")
  .filter(Boolean)
  .map(line => line.split(" ").filter(Boolean))
  .reduce(
    (o, [abbr, prop]) => ({
      ...o,
      [prop]: abbr
    }),
    {}
  );

const css = ainsleyToCss(extend());

const CHARS = 500;
console.log("\nOutput:");
console.log(
  css.length > CHARS * 2
    ? `${css.slice(0, CHARS)}\n...\n${css.slice(-CHARS)}`
    : css
);

let ruleCount = 0;

try {
  csstree.walk(csstree.parse(css), {
    visit: "Raw",
    enter: node => {
      throw new Error("Invalid CSS");
    }
  });
  csstree.walk(csstree.parse(css), {
    visit: "Rule",
    enter: node => {
      ruleCount++;

      const { prelude, block } = node;

      const firstSelector = prelude.children.head;
      if (firstSelector.next) throw new Error("multiple selectors on a block");
      const firstFrag = firstSelector.data.children.head;
      if (firstFrag.data.type !== "ClassSelector")
        throw new Error("frag is not a class");
      const className = firstFrag.data.name;
      let attrSearch = className.match(/^([a-z]+)/);
      if (!attrSearch) {
        if (/^[A-Z]/.test(className)) {
          return console.log("must be a custom class");
        } else {
          throw new Error("no attribute prefix on class");
        }
      }

      const properties = [];
      csstree.walk(block, {
        visit: "Declaration",
        enter: node => {
          properties.push(node.property);
        }
      });

      if (properties.length === 0) {
        throw new Error("no properties found in rule block");
      }

      const prefix = attrSearch[1];
      const property = properties[0];
      const expectedPrefix = property
        .split("-")
        .map(w => w[0])
        .join("");

      // if (prefix !== abbrMap[property] && !["ma", "pa"].includes(prefix)) {
      //   console.log(className, prefix, property, abbrMap[property]);
      //   throw new Error("unexpected attr prefix on class");
      // }
    }
  });
} catch (err) {
  console.error(err);
}

fs.writeFileSync(path.join(__dirname, "output.css"), css);

console.log({ ruleCount });
