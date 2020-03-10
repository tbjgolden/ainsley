const fs = require("fs");
const path = require("path");
const { exec } = require('child_process');

const srcDir = path.join(__dirname, "src");
fs.readdirSync(srcDir)
  .filter(name => name.endsWith(".config.js"))
  .forEach(name => {
    exec(`npx rollup --config ${path.join(srcDir, name)}`, (err, stdout, stderr) => {
      if (stdout.trim()) console.log(stdout.trim());
      if (stderr.trim()) console.error(stderr.trim());
      if (err) throw err;
    });
  });
