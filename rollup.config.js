import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import { sizeSnapshot } from 'rollup-plugin-size-snapshot'
import sourcemaps from 'rollup-plugin-sourcemaps'
import { terser } from 'rollup-plugin-terser'

import json from '@rollup/plugin-json'

import pkg from './package.json'

const inputs = ['./compiled/index.js']

const knownDependencyNames = {
  'react-dom': 'ReactDOM',
  'react': 'React'
}

const kebabToPascal = (kebab) => {
  const pascal = kebab
    .split('-')
    .map((str) => {
      if (str.length > 0) {
        return str[0].toUpperCase() + str.slice(1)
      } else {
        return ''
      }
    })
    .join('')
  console.warn(
    `Guessing the window.[name] for package "${kebab}" is "${pascal}"\nIf not, add\n  '${kebab}': '[name]',\nto knownDependencyNames in rollup.config.js`
  )
  return pascal
}

const getGlobals = (bundleType) =>
  ['UMD_DEV', 'UMD_PROD'].includes(bundleType)
    ? Object.keys(pkg.peerDependencies || {}).reduce(
        (dependencyNameMap, npmDependency) => ({
          ...dependencyNameMap,
          [npmDependency]:
            knownDependencyNames[npmDependency] || kebabToPascal(npmDependency)
        }),
        {}
      )
    : {}

const getExternal = (bundleType) => {
  const peerDependencies = Object.keys(pkg.peerDependencies || {})
  const dependencies = Object.keys(pkg.dependencies)

  const makeExternalPredicate = (externals) => {
    if (externals.length === 0) {
      return () => false
    } else {
      const pattern = new RegExp(`^(${externals.join('|')})($|/)`)
      return (id) => pattern.test(id)
    }
  }

  switch (bundleType) {
    case 'CJS_DEV':
    case 'CJS_PROD':
    case 'ES':
      return makeExternalPredicate([...peerDependencies, ...dependencies])
    default:
      return makeExternalPredicate(peerDependencies)
  }
}

const isProduction = (bundleType) => bundleType.endsWith('_PROD')

const getPlugins = (bundleType) => [
  nodeResolve(),
  commonjs({
    include: 'node_modules/**'
  }),
  babel({
    babelrc: false,
    exclude: 'node_modules/**',
    presets: [['@babel/env', { loose: true, modules: false }], '@babel/react'],
    plugins: ['@babel/transform-runtime'],
    runtimeHelpers: true
  }),
  json(),
  replace({
    'process.env.NODE_ENV': isProduction(bundleType)
      ? '"production"'
      : '"development"'
  }),
  sourcemaps(),
  sizeSnapshot(),
  isProduction(bundleType) &&
    terser({
      output: { comments: false },
      compress: {
        keep_infinity: true,
        pure_getters: true
      },
      warnings: true,
      ecma: 5,
      toplevel: false
    })
]

const getCjsConfig = (input, bundleType) => ({
  input,
  external: getExternal(bundleType),
  output: {
    file: `dist/gocvmmeyaahgakggbjwmcmif.cjs.${
      isProduction(bundleType) ? 'production' : 'development'
    }.js`,
    format: 'cjs',
    sourcemap: true
  },
  plugins: getPlugins(bundleType)
})

const getEsConfig = (input) => ({
  input,
  external: getExternal('ES'),
  output: {
    file: pkg.module,
    format: 'es',
    sourcemap: true
  },
  plugins: getPlugins('ES')
})

const getUmdConfig = (input, bundleType) => ({
  input,
  external: getExternal(bundleType),
  output: {
    file: `dist/gocvmmeyaahgakggbjwmcmif.umd.${
      isProduction(bundleType) ? 'production' : 'development'
    }.js`,
    format: 'umd',
    globals: getGlobals(bundleType),
    name: 'Gocvmmeyaahgakggbjwmcmif',
    sourcemap: true
  },
  plugins: getPlugins(bundleType)
})

export default inputs
  .map((input) => [
    getCjsConfig(input, 'CJS_DEV'),
    getCjsConfig(input, 'CJS_PROD'),
    getEsConfig(input),
    ...(pkg.browser
      ? [getUmdConfig(input, 'UMD_DEV'), getUmdConfig(input, 'UMD_PROD')]
      : [])
  ])
  .flat()
