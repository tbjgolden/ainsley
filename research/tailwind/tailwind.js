const { execSync } = require("child_process");
const fs = require("fs-extra");
const path = require("path");
const csstree = require("css-tree");
const { parseSmartMap, propertyWordMap } = require("../../dist/ainsley");
const shorthandPropMap = require("../shorthand.js");

console.log(Object.keys(shorthandPropMap));

const deepMap = {};
Object.entries(shorthandPropMap).reduce((o, [k, v]) => {
  const vl = v;
  for (let i = 0; i < v.length; i++) {
    const w = shorthandPropMap[v[i]];
    if (w) {
      const wl = w;
      for (let j = 0; j < w.length; j++) {
        const x = shorthandPropMap[w[i]];
        if (x) {
          wl.push(...x);
        }
      }
      vl.push(...wl);
      deepMap[v[i]] = [...new Set([...(deepMap[v[i]] || []), ...wl])];
    }
  }
  deepMap[k] = [...new Set([...(deepMap[k] || []), ...vl])];
}, {});

const config = path.join(__dirname, "tailwind.config.js");
const input = path.join(__dirname, "input.tailwind.css");
const output = path.join(__dirname, "output.css");
const analysis = path.join(__dirname, "analysis.json");

// avoid potential values
const propWordMap =
  {
    // short hand properties use first 2 letters
    animation: "an",
    background: "ba",
    border: "bo",
    columns: "co",
    flex: "fl", // float
    font: "fo",
    grid: "gr",
    margin: "ma",
    offset: "of", // object fit
    outline: "ou",
    overflow: "ov",
    padding: "pa",
    transition: "tr",

    // prevents object-fit clashing with offset
    object: "ob",

    // size and sizing
    size: "sz",
    sizing: "sz",

    // min and max
    min: "n",
    max: "x",

    // sort out the 4 'c's situation - color is "c"
    cursor: "cu",
    clear: "cl",
    clip: "cp",

    // style fixes two collisions
    style: "st",

    // border-collapse collides with border-color
    collapse: "co",

    // remaining single word collisions
    hyphens: "hy", //  height
    transform: "tf", // top
    resize: "re", // right
    order: "or", // opacity
    fill: "fi" // float
  } ||
  parseSmartMap(propertyWordMap).reduce(
    (o, [k, v]) => ({
      ...o,
      [v]: k
    }),
    {}
  );

const force = process.argv[2] === "-f";

if (force || !fs.existsSync(output)) {
  console.log(
    execSync(
      `npx tailwindcss build ${input} -o ${output} -c ${config}`
    ).toString()
  );
}

if (force || !fs.existsSync(analysis)) {
  const propCounts = {};
  csstree.walk(csstree.parse(fs.readFileSync(output)), {
    visit: "Rule",
    enter: node => {
      let child = node.block.children.head;
      while (child) {
        if (child.data.type === "Declaration") {
          const prop = child.data.property;
          // exclude variables and vendor prefixes
          if (prop !== "content" && !prop.startsWith("-")) {
            propCounts[prop] = (propCounts[prop] || 0) + 1;
            if (deepMap[prop]) {
              deepMap[prop].forEach(subprop => {
                propCounts[subprop] = (propCounts[subprop] || 0) + 1;
              });
            }
          }
        }
        child = child.next;
      }
    }
  });
  fs.writeFileSync(analysis, JSON.stringify(propCounts));
}

const abbrevMap = {};
const allProps = Object.keys(require("./analysis.json"));
allProps.forEach(prop => {
  const abbrev = prop
    .split("-")
    .map(w => {
      const abbr = propWordMap[w];
      if (typeof abbr === "string") return abbr;
      return w[0];
    })
    .join("");
  abbrevMap[abbrev] = [...(abbrevMap[abbrev] || []), prop];
});

Object.entries(abbrevMap)
  .sort(([a], [b]) => (a > b ? 1 : -1))
  .forEach(([k, v]) => {
    console.log(k.padEnd(4, " "), v);
  });

Object.entries(
  Object.values(abbrevMap)
    .filter(x => x.length > 1)
    .flatMap(x => x.flatMap(y => y.split("-")))
    .reduce(
      (o, k) => ({
        ...o,
        [k]: (o[k] || 0) + 1
      }),
      {}
    )
)
  .sort(([a], [b]) => (a > b ? 1 : -1))
  .sort(([, a], [, b]) => b - a)
  .forEach(x => console.log(x));
