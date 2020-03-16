const brotli = require("brotli");
const { gzip } = require("node-gzip");
const fs = require("fs");
const path = require("path");
const csstree = require("css-tree");
require("isomorphic-fetch");

const checkUrl = async (name, url) => {
  const css = await (await fetch(url)).text();
  return checkCSS(name, css);
};

const checkCSS = async (name, css) => {
  let count = 0;
  csstree.walk(csstree.parse(css), {
    visit: "Rule",
    enter: () => count++
  });

  name = name.padStart(20, " ");

  console.log(name, "  rule   count:", count);
  console.log(name, "minified bytes:", Buffer.from(css).byteLength);
  console.log(name, "  gzip   bytes:", (await gzip(css)).byteLength);
  console.log(
    name,
    " brotli  bytes:",
    brotli.compress(css, { mode: 1 }).byteLength
  );
};

Object.entries({
  tailwindcss: "https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css",
  tachyons:
    "https://raw.githubusercontent.com/tachyons-css/tachyons/master/css/tachyons.min.css",
  "sane-tachyons":
    "https://raw.githubusercontent.com/hatchedlabs/sane-tachyons/master/sane-tachyons.min.css",
  turret:
    "https://raw.githubusercontent.com/turretcss/turretcss/master/dist/turretcss.min.css",
  solid: "https://www.buzzfeed.com/static-assets/solid/solid.2.11.1.min.css",
  basscss:
    "https://cdnjs.cloudflare.com/ajax/libs/basscss/8.1.0/css/basscss.min.css"
}).forEach(pair => checkUrl(...pair));
