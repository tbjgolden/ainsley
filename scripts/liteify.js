const fs = require("fs");
const path = require("path");
const litePath = path.join(__dirname, "../dist/compiler.lite.web.js");

const before = fs.readFileSync(litePath, "utf8");

if (before.startsWith("let ")) process.exit(0);

const after = before
  .replace(/\bconst\b/g, "let")
  .replace(/^[^;]*;/, "let AC=(()=>{")
  .replace(/\(\);\n?$/, ")();");

fs.writeFileSync(litePath, after);
