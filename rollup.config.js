import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";
import { sizeSnapshot } from "rollup-plugin-size-snapshot";
import babel from "rollup-plugin-babel";

const input = ["extend", "compiler", "compiler.lite"];

export default ["extend", "compiler", "compiler.lite"].flatMap(file => [
  {
    input: `src/${file}.js`,
    output: [
      {
        file: `dist/${file}.js`,
        format: "es"
      },
      {
        file: `dist/${file}.cjs.js`,
        format: "cjs"
      },
      {
        file: `dist/${file}.web.js`,
        format: "iife",
        name: `A${file[0].toUpperCase()}`
      }
    ],
    plugins: [json(), sizeSnapshot(), terser()]
  },
  {
    input: `src/${file}.js`,
    output: [
      {
        file: `dist/${file}.es5.js`,
        format: "es"
      },
      {
        file: `dist/${file}.es5.cjs.js`,
        format: "cjs"
      },
      {
        file: `dist/${file}.es5.web.js`,
        format: "iife",
        name: `A${file[0].toUpperCase()}`
      }
    ],
    plugins: [babel(), json(), sizeSnapshot(), terser()]
  }
]);

