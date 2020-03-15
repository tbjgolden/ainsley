const brotli = require("brotli");
const fs = require("fs");
const path = require("path");

console.log(
  "compiler ",
  brotli.compress(
    fs.readFileSync(path.join(__dirname, "../dist/compiler.lite.js")),
    { mode: 1 }
  ).byteLength
);

console.log(
  "base    ",
  brotli.compress(fs.readFileSync(path.join(__dirname, "base.min.js")), {
    mode: 1
  }).byteLength
);

const together =
  fs.readFileSync(path.join(__dirname, "../dist/compiler.lite.js"), "utf8") +
  fs.readFileSync(path.join(__dirname, "base.min.js"), "utf8");

console.log(
  "together",
  brotli.compress(Buffer.from(together), { mode: 1 }).byteLength
);
