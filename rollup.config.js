import json from '@rollup/plugin-json';
import { terser } from "rollup-plugin-terser";
import { sizeSnapshot } from "rollup-plugin-size-snapshot";

export default [
  {
    input: 'src/extend.js',
    output: [{
      file: 'dist/extend.js',
      format: 'es'
    },{
      file: 'dist/extend.cjs.js',
      format: 'cjs'
    }],
    plugins: [json(), terser()]
  },
  {
    input: 'src/compiler.js',
    output: [{
      file: 'dist/compiler.js',
      format: 'es'
    },{
      file: 'dist/compiler.cjs.js',
      format: 'cjs'
    }],
    plugins: [sizeSnapshot(), terser()]
  },
  {
    input: 'src/compiler.lite.js',
    output: {
      file: 'dist/compiler.lite.js',
      format: 'iife',
      name: "Ainsley"
    },
    plugins: [sizeSnapshot(), terser()]
  }
]
