const path = require('path')
const webpack = require('webpack')

const projectDir = path.join(__dirname, '..')

module.exports = {
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  devServer: {
    contentBase: path.join(projectDir, 'public'),
    compress: true,
    port: 3000
  },
  entry: {
    ainsley: path.join(projectDir, 'src/entrypoints/ainsley.ts'),
    'ainsley.client': path.join(projectDir, 'src/entrypoints/ainsley.client.ts')
  },
  output: {
    filename: '[name].cjs.js',
    path: path.join(projectDir, 'dist'),
    libraryTarget: 'commonjs2'
  },
  optimization: {
    minimize: true
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: [
          {
            loader: 'babel-loader',
            options: { extends: './babel.config.js' }
          },
          'eslint-loader'
        ]
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [{ loader: 'ts-loader' }, { loader: 'eslint-loader' }]
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
      },
      {
        test: /\.(png|svg|jpg|gif)$/i,
        use: ['file-loader']
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: 'true'
    })
  ]
}
