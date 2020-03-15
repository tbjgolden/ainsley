const fs = require("fs");
const path = require("path");
const { encode, decode } = require("base2048");

const compilerSource = fs.readFileSync(
  path.join(__dirname, "../compiler/dist/compiler.js"),
  "utf8"
);

console.log(
  compilerSource,
  encode(compilerSource),
  new TextEncoder().encode(encode(compilerSource)).length
);
