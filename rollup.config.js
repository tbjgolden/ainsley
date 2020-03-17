import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";
import { sizeSnapshot } from "rollup-plugin-size-snapshot";
import babel from "rollup-plugin-babel";
import jscc from "rollup-plugin-jscc";
import path from "path";

const extendConfig = {
  output: { sourcemap: true }
};

const compilerConfig = {
  external: ["accb"],
  output: {
    globals: { accb: "accb" },
    sourcemap: true
  }
};

const inputs = [
  { name: "extend", ...extendConfig },
  { name: "compiler", ...compilerConfig },
  { name: "compiler.lite", ...compilerConfig }
];

const plugins = [json(), sizeSnapshot(), terser()];

export default inputs.flatMap(({ name, output, ...rest }) => {
  const replacer = jscc({
    values: {
      _LITE: name.endsWith(".lite"),
      _FAST: name.endsWith(".fast")
    }
  });

  return [
    {
      input: `src/${name}.js`,
      output: [
        {
          file: `dist/${name}.js`,
          format: "es",
          ...(output || {})
        },
        {
          file: `dist/${name}.cjs.js`,
          format: "cjs",
          ...(output || {})
        },
        {
          file: `dist/${name}.web.js`,
          format: "iife",
          name: `a${name[0].toLowerCase()}`,
          ...(output || {})
        }
      ],
      plugins: [...plugins, replacer],
      ...rest
    },
    {
      input: `src/${name}.js`,
      output: [
        {
          file: `dist/${name}.es5.cjs.js`,
          format: "cjs",
          ...(output || {})
        },
        {
          file: `dist/${name}.es5.web.js`,
          format: "iife",
          name: `a${name[0].toLowerCase()}`,
          ...(output || {})
        }
      ],
      plugins: [...plugins, replacer, babel()],
      ...rest
    }
  ];
});
