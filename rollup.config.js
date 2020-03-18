const json = require("@rollup/plugin-json");
const { terser } = require("rollup-plugin-terser");
const { sizeSnapshot } = require("rollup-plugin-size-snapshot");
const babel = require("rollup-plugin-babel");
const jscc = require("rollup-plugin-jscc");
const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const path = require("path");
const pkgJson = require("./package.json");

const config = (() => {
  const sources = [
    ["compiler", ["auto"]],
    ["compiler.lite", ["auto"]],
    ["tools", ["auto"]],
    ["lint", ["es", "cjs"]]
  ];

  const validFormats = ["es", "cjs"];

  return sources.flatMap(([fileName, formats]) =>
    formats.flatMap(format => {
      const vars = {
        lite: fileName.endsWith(".lite"),
        fast: fileName.endsWith(".fast"),
        ext: "",
        global: false
      };

      if (validFormats.includes(format)) {
        vars.ext = `.${format}`;
      } else {
        vars.global = format;
        format = vars.lite ? "iife" : "umd";
      }

      // Licence comment
      let banner = `/** @license Ainsley v${pkgJson.version} (Tom Golden <tom.bio> @tbjgolden) */\n`;

      const config = [
        {
          input: `src/${fileName}.js`,
          output: {
            format,
            banner,
            file: `dist/${fileName}${vars.ext}.js`,
            sourcemap: true,
            ...(vars.global ? { name: vars.global } : {})
          },
          plugins: [
            json(),
            ...(vars.lite
              ? [sizeSnapshot(), terser()]
              : [babel(), resolve(), commonjs()]),
            jscc({
              values: Object.entries(vars).reduce(
                (obj, [k, v]) => ({
                  ...obj,
                  [`_${k.toUpperCase()}`]: v
                }),
                {}
              )
            })
          ],
          onwarn: (warning, warn) => warn(warning)
        }
      ];

      if (vars.lite) {
        const base = config[0];
        const es5 = JSON.parse(JSON.stringify(base));
        es5.plugins.push(babel(), terser());
        es5.output.file = `${es5.output.file.slice(0, -3)}.es5.js`;
        config.push(es5);
      }

      return config;
    })
  );
})();

// config.forEach(x => console.log(x));

module.exports = config;
