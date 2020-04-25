module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    '@babel/plugin-transform-typescript',
    'minify-dead-code-elimination'
  ],
  env: {
    test: {
      plugins: ['@babel/plugin-transform-runtime']
    }
  }
}
