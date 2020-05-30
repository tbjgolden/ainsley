module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: ['@storybook/addon-knobs/register'],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.tsx?$/,
      loader: require.resolve('babel-loader'),
      options: {
        parserOpts: {
          jsx: 'preserve'
        },
        presets: [['react-app', { flow: false, typescript: true }]]
      }
    })
    config.resolve.extensions.push('.ts', '.tsx')
    return config
  }
}
