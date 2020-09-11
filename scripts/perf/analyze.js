#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const zlib = require('zlib')
const babel = require('@babel/core')

const input = require('./test')

const builds = {
  'ac.js': 'iife',
  'ainsley.client.esm.js': 'esm',
  'ainsley.client.development.js': 'umd',
  'ainsley.client.production.js': 'iife',
  'ainsley.js': 'cjs'
}

const requireFromString = (jsStr, filepath) => {
  const Module = module.constructor
  const m = new Module()
  m._compile(jsStr, filepath)
  return m.exports
}

// console.log(requireFromString('module.exports = { test: 1 }'));

const analyze = async () => {
  const results = {}
  for (const [file, format] of Object.entries(builds)) {
    const filepath = path.join(__dirname, '../../dist', file)
    const contents = fs.readFileSync(filepath, 'utf8')

    let Ainsley = new Promise(() => {
      /**/
    })

    if (format === 'iife') {
      Ainsley = Promise.resolve(eval(`(()=>{\n${contents}\nreturn Ainsley})()`))
    } else if (['umd', 'cjs'].includes(format)) {
      Ainsley = Promise.resolve(require(filepath))
    } else if (format === 'esm') {
      const js = babel.transformSync(contents, {
        presets: ['@babel/preset-env']
      }).code
      Ainsley = Promise.resolve(requireFromString(js, filepath))
    }

    const { generate } = await Ainsley

    const start = Date.now()
    generate(input)
    const duration = Date.now() - start

    results[file] = {
      file,
      format,
      duration,
      bytes: {
        raw: Buffer.from(contents).byteLength,
        gzip: zlib.gzipSync(contents).byteLength,
        brotli: zlib.brotliCompressSync(contents).byteLength
      }
    }
  }
  return results
}

if (require.main === module) {
  analyze().then((result) => console.log(JSON.stringify(result)))
}

module.exports = analyze
