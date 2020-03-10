import json from '@rollup/plugin-json';
import { terser } from "rollup-plugin-terser";
import { sizeSnapshot } from "rollup-plugin-size-snapshot";

export default [
  {
    input: 'src/extend.js',
    output: {
      file: 'dist/extend.js',
      format: 'cjs'
    },
    plugins: [json(), terser()]
  },
  {
    input: 'src/compiler.js',
    output: {
      file: 'dist/compiler.js',
      format: 'cjs'
    },
    plugins: [sizeSnapshot(), terser({ compress: { ecma: 5 } })]
  },
  {
    input: 'src/compiler.lite.js',
    output: {
      file: 'dist/compiler.lite.js',
      format: 'iife',
      name: "Ainsley"
    },
    plugins: [sizeSnapshot(), terser({ compress: { ecma: 2017 } })]
  },
  {
    input: 'src/compiler.lite.js',
    output: {
      file: 'dist/compiler.lite.legacy.js',
      format: 'iife',
      name: "Ainsley"
    },
    plugins: [sizeSnapshot(), terser({ compress: { ecma: 5 } })]
  }
]
