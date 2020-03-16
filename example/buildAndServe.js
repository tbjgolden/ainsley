const { extend } = require("ainsley");
const compile = require("ainsley/dist/compiler.lite.cjs");

const ainsley = extend(null, {
  defs: [["ff&", [["font-family", "{fontFamily}"]]]],
  props: [["letter-spacing", ["0", "1px", "2px", "3px"]]],
  "{listStyleType}": {
    D: "disc",
    C: "circle",
    S: "square"
  },
  "{listStylePosition}": {
    I: "inside",
    O: "outside"
  },
  "{fontFamily}": {
    SANS:
      "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen-Sans,Ubuntu,Cantarell,'Helvetica Neue',sans-serif",
    SERIF:
      "Constantia,'Lucida Bright',Lucidabright,'Lucida Serif',Lucida,'DejaVu Serif','Bitstream Vera Serif','Liberation Serif',Georgia,serif",
    MONO:
      "Consolas,'Andale Mono WT','Andale Mono','Lucida Console','Lucida Sans Typewriter','DejaVu Sans Mono','Bitstream Vera Sans Mono','Liberation Mono','Nimbus Mono L',Monaco,'Courier New',Courier,monospace"
  }
});

const express = require("express");
const fs = require("fs-extra");
const path = require("path");

(async () => {
  // copy all files
  await fs.remove(path.join(__dirname, "dist"));
  // copy all files
  await fs.copy(path.join(__dirname, "src"), path.join(__dirname, "dist"));
  // move template file
  await fs.move(
    path.join(__dirname, "dist/index.template.html"),
    path.join(__dirname, "dist/index.html")
  );
  // compile static css file
  await fs.writeFile(
    path.join(__dirname, "dist/equiv.min.css"),
    compile(ainsley)
  );
  // replace template with variable
  const template = await fs.readFile(
    path.join(__dirname, "dist/index.html"),
    "utf8"
  );
  const html = template.replace(/\/\*AINSLEY\*\//g, JSON.stringify(ainsley));
  await fs.writeFile(path.join(__dirname, "dist/index.html"), html);

  const app = express();
  app.use(express.static(path.join(__dirname, "dist")));
  app.listen(8080, () => console.log("http://localhost:8080"));
})();
