const brotli = require('brotli');
const fs = require('fs');
const path = require('path');

console.log(
  "compiler",
  brotli.compress(
    fs.readFileSync(path.join(__dirname, "../dist/compiler.lite.js")),
    { mode: 1 }
  ).byteLength
);

console.log(
  "base",
  brotli.compress(
    fs.readFileSync(path.join(__dirname, "base.min.js")),
    { mode: 1 }
  ).byteLength
);
