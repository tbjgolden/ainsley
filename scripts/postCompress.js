#!/usr/bin/env node

const Terser = require('terser')
const fs = require('fs')
const path = require('path')

const input = fs.readFileSync(
  path.join(__dirname, '../dist/ainsley.client.production.js'),
  'utf8'
)

const withArrow = input
  .replace(
    /var ([^ ]*)=function(\([^\)]*\)){['"]use strict['"];/,
    (_, a, b) => `var ${a}=(${b}=>{"4 the sourcemap";`
  )
  .replace(/\}\(\{\}\)\;\n/g, '})({});\n')

const { code, map } = Terser.minify(withArrow, {
  output: { comments: /^!/ },
  compress: {
    unsafe: true,
    keep_infinity: true,
    pure_getters: true
  },
  mangle: {
    properties: {
      regex: /^\$/
    }
  },
  sourceMap: {
    content: fs.readFileSync(
      path.join(__dirname, '../dist/ainsley.client.production.js.map'),
      'utf8'
    ),
    url: 'ac.js.map'
  },
  warnings: true,
  ecma: 2019,
  toplevel: false
})

fs.writeFileSync(path.join(__dirname, '../dist/ac.js'), code)
fs.writeFileSync(path.join(__dirname, '../dist/ac.js.map'), map)
