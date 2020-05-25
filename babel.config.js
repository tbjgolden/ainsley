module.exports = {
  presets: [
    ['@babel/preset-env', { loose: true, modules: false }],
    '@babel/preset-react'
  ],
  plugins: [
    '@babel/plugin-transform-typescript',
    'minify-dead-code-elimination',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    'macros'
  ],
  env: {
    test: {
      plugins: ['@babel/plugin-transform-runtime']
    }
  }
}
