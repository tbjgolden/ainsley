const json = require("@rollup/plugin-json");
const { terser } = require("rollup-plugin-terser");
const { sizeSnapshot } = require("rollup-plugin-size-snapshot");
const babel = require("rollup-plugin-babel");
const jscc = require("rollup-plugin-jscc");
const path = require("path");

const config = (() => {
  const sources = [
    ["compiler", ["auto"]],
    ["compiler.lite", ["AC"]],
    ["tools", ["auto"]]
  ];

  const plugins = [json(), sizeSnapshot(), terser()];
  const validFormats = ["es", "cjs"];

  return sources.flatMap(([fileName, formats]) =>
    formats.flatMap(format => {
      const vars = {
        lite: fileName.endsWith(".lite"),
        fast: fileName.endsWith(".fast"),
        ext: "",
        global: false,
        cb: false
      };

      if (validFormats.includes(format)) {
        vars.ext = `.${format}`;
      } else {
        vars.global = format;
        vars.cb = vars.global === "auto" ? false : `${vars.global}CB`;
        format = vars.lite ? "iife" : "umd";
      }

      const config = [
        {
          input: `src/${fileName}.js`,
          output: {
            format,
            file: `dist/${fileName}${vars.ext}.js`,
            sourcemap: true,
            ...(vars.global ? { name: vars.global } : {}),
            ...(vars.cb ? { globals: { [vars.cb]: vars.cb } } : {})
          },
          plugins: [
            json(),
            ...(vars.lite ? [sizeSnapshot(), terser()] : [babel()]),
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
          ...(vars.cb ? { external: [vars.cb] } : {})
        }
      ];

      if (vars.lite) {
        const base = config[0];
        const es5 = JSON.parse(JSON.stringify(base));
        es5.plugins.push(babel());
        es5.output.file = `${es5.output.file.slice(0, -3)}.es5.js`;
        config.push(es5);
      }

      return config;
    })
  );
})();

// config.forEach(x => console.log(x));

module.exports = config;
