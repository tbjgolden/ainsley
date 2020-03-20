const { extend, base } = require("ainsley");
const { ainsleyToCSS } = require("ainsley/dist/compiler");

const ainsley = extend([
  base,
  {
    defs: [["ff&", [["font-family", "{fontFamily}"]]]],
    "{fontFamily}": ["SANS-serif", "SERIF", "MONOspace"]
  }
]);

const express = require("express");
const fs = require("fs-extra");
const path = require("path");

(async () => {
  // copy all files
  await fs.remove(path.join(__dirname, "dist"));
  // copy all files
  await fs.copy(path.join(__dirname, "src"), path.join(__dirname, "dist"));
  await Promise.all([
    fs.copy(
      path.join(__dirname, "../../dist/compiler.lite.js"),
      path.join(__dirname, "dist/compiler.lite.js")
    ),
    fs.copy(
      path.join(__dirname, "../../dist/compiler.lite.js.map"),
      path.join(__dirname, "dist/compiler.lite.js.map")
    ),
    fs.move(
      path.join(__dirname, "dist/index.template.html"),
      path.join(__dirname, "dist/index.html")
    ),
    fs.writeFile(
      path.join(__dirname, "dist/equiv.min.css"),
      ainsleyToCSS(ainsley)
    )
  ]);
  // replace template with variable
  const template = await fs.readFile(
    path.join(__dirname, "dist/index.html"),
    "utf8"
  );
  await fs.writeFile(
    path.join(__dirname, "dist/index.html"),
    template.replace(/\/\*AINSLEY\*\//g, JSON.stringify(ainsley))
  );

  const app = express();
  app.use(express.static(path.join(__dirname, "dist")));
  app.listen(8080, () => console.log("http://localhost:8080"));
})();
