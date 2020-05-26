const path = require('path')
const json = require('@rollup/plugin-json')
const { terser } = require('rollup-plugin-terser')
const { sizeSnapshot } = require('rollup-plugin-size-snapshot')
const babel = require('rollup-plugin-babel')
const resolve = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const typescript = require('@rollup/plugin-typescript')
const pkgJson = require('../package.json')

const projectRootDir = path.join(__dirname, '..')

const config = (() => {
  const sources = [
    ['ainsley', ['Ainsley', 'es', 'cjs']],
    ['ainsley.client', ['Ainsley']]
  ]

  const validFormats = ['es', 'cjs']

  const configs = [
    ...sources.flatMap(([fileName, formats]) =>
      formats.flatMap((format) => {
        const vars = {
          lite: fileName.endsWith('.client'),
          ext: '',
          global: false
        }

        if (validFormats.includes(format)) {
          vars.ext = `.${format}`
        } else {
          vars.global = format
          format = vars.lite ? 'iife' : 'umd'
        }

        const config = {
          input: path.join(projectRootDir, `src/entrypoints/${fileName}.ts`),
          output: {
            format,
            banner: `/** @license Ainsley v${pkgJson.version} (Tom Golden <tom.bio> @tbjgolden) */\n`,
            file: path.join(projectRootDir, `dist/${fileName}${vars.ext}.js`),
            sourcemap: true,
            ...(vars.global ? { name: vars.global } : {})
          },
          plugins: [
            typescript({
              tsconfig: path.join(projectRootDir, 'tsconfig.json')
            }),
            json(),
            ...(vars.lite
              ? [
                  sizeSnapshot(),
                  terser({
                    mangle: {
                      properties: {
                        regex: /^\$/
                      }
                    }
                  })
                ]
              : [resolve(), commonjs()])
          ],
          onwarn: (warning, warn) => warn(warning)
        }

        return config
      })
    ),
    {
      input: path.join(projectRootDir, `src/entrypoints/ainsley.ts`),
      output: {
        dir: path.join(projectRootDir, 'dist'),
        banner: `/** @license Ainsley v${pkgJson.version} (Tom Golden <tom.bio> @tbjgolden) */\n`,
        sourcemap: true
      },
      plugins: [
        typescript({
          tsconfig: path.join(projectRootDir, 'tsconfig.json'),
          declaration: true,
          declarationDir: 'dist'
        }),
        json(),
        resolve(),
        commonjs()
      ],
      onwarn: (warning, warn) => warn(warning)
    }
  ]

  return configs
})()

module.exports = config
