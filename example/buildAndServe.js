const { extend } = require('ainsley');

const ainsley = extend(
  null,
  {
    "defs": [
      [
        ".ls&",
        [["list-style", "{listStyleType} {listStylePosition}"]]
      ]
    ],
    "props": [
      ["letter-spacing", ["0", "1px", "2px", "3px"]]
    ],
    "{listStyleType}": {
      "D": "disc",
      "C": "circle",
      "S": "square"
    },
    "{listStylePosition}": {
      "I": "inside",
      "O": "outside"
    }
  }
);

const express = require('express');
const fs = require('fs-extra');
const path = require('path');

(async () => {
  // copy all files
  await fs.remove(path.join(__dirname, "dist"));
  // copy all files
  await fs.copy(path.join(__dirname, "src"), path.join(__dirname, "dist"));
  // move template file
  await fs.move(path.join(__dirname, "dist/index.template.html"), path.join(__dirname, "dist/index.html"));
  // replace template with variable
  const template = await fs.readFile(path.join(__dirname, "dist/index.html"), "utf8");
  const html = template.replace(/\/\*AINSLEY\*\//g, JSON.stringify(ainsley));
  await fs.writeFile(path.join(__dirname, "dist/index.html"), html);

  const app = express();
  app.use(express.static('dist'));
  app.listen(8080, () => console.log("http://localhost:8080"))
})();


