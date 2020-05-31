import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import sourcemaps from 'rollup-plugin-sourcemaps'
import { terser } from 'rollup-plugin-terser'

import json from '@rollup/plugin-json'

import pkg from './package.json'

const inputs = ['./compiled/ainsley.js', './compiled/ainsley.client.js']

const knownDependencyNames = {
  'isomorphic-unfetch': 'fetch',
  'csso': 'csso'
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

const getRoot = (input) => input.slice(input.lastIndexOf('/') + 1, -3)

const getGlobals = (bundleType) => {
  const optionalDependencies = Object.keys(pkg.optionalDependencies || {})
  const peerDependencies = Object.keys(pkg.peerDependencies || {})

  return ['UMD_DEV', 'IIFE_PROD'].includes(bundleType)
    ? [...peerDependencies, ...optionalDependencies].reduce(
        (dependencyNameMap, npmDependency) => ({
          ...dependencyNameMap,
          [npmDependency]:
            knownDependencyNames[npmDependency] || kebabToPascal(npmDependency)
        }),
        {}
      )
    : {}
}

const getExternal = (bundleType) => {
  const optionalDependencies = Object.keys(pkg.optionalDependencies || {})
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
      return makeExternalPredicate([
        ...optionalDependencies,
        ...peerDependencies,
        ...dependencies
      ])
    default:
      return makeExternalPredicate([
        ...optionalDependencies,
        ...peerDependencies
      ])
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
  isProduction(bundleType) &&
    terser({
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
      warnings: true,
      ecma: 2019,
      toplevel: false
    })
]

const shortBanner = `/*! ainsley MIT @tbjgolden */`
const longBanner = `/*! ainsley | MIT License | @tbjgolden | tom.bio */`

const getCjsConfig = (input, bundleType) => ({
  input,
  external: getExternal(bundleType),
  inlineDynamicImports: true,
  output: {
    file: `dist/${getRoot(input)}.cjs.${
      isProduction(bundleType) ? 'production' : 'development'
    }.js`,
    format: 'cjs',
    banner: longBanner,
    sourcemap: true
  },
  plugins: getPlugins(bundleType)
})

const getEsConfig = (input) => ({
  input,
  external: getExternal('ES'),
  inlineDynamicImports: true,
  output: {
    file: `dist/${getRoot(input)}.esm.js`,
    format: 'es',
    banner: longBanner,
    sourcemap: true
  },
  plugins: getPlugins('ES')
})

const getUmdConfig = (input, bundleType) => ({
  input,
  external: getExternal(bundleType),
  inlineDynamicImports: true,
  output: {
    file: `dist/${getRoot(input)}.development.js`,
    format: 'umd',
    globals: getGlobals(bundleType),
    name: 'Ainsley',
    banner: longBanner,
    sourcemap: true
  },
  plugins: getPlugins(bundleType)
})

const getIifeConfig = (input, bundleType) => ({
  input,
  external: getExternal(bundleType),
  inlineDynamicImports: true,
  output: {
    file: `dist/${getRoot(input)}.production.js`,
    format: 'iife',
    globals: getGlobals(bundleType),
    name: 'Ainsley',
    banner: shortBanner,
    sourcemap: true
  },
  plugins: getPlugins(bundleType)
})

export default inputs
  .map((input) => [
    getEsConfig(input),
    // if client is in the url, skip cjs builds
    ...(input.includes('.client.')
      ? []
      : [getCjsConfig(input, 'CJS_DEV'), getCjsConfig(input, 'CJS_PROD')]),
    // if browser isn't in package.json, skip umd builds
    ...(pkg.browser
      ? [getUmdConfig(input, 'UMD_DEV'), getIifeConfig(input, 'IIFE_PROD')]
      : [])
  ])
  .flat()
