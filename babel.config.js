module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: false
      }
    ]
  ],
  env: {
    test: {
      plugins: ["@babel/plugin-transform-runtime"]
    }
  }
};
