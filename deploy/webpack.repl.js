const path = require('path')
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const projectDir = path.join(__dirname, '..')

module.exports = {
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.wasm']
  },
  devServer: {
    contentBase: path.join(projectDir, 'public'),
    compress: true,
    port: 3000
  },
  entry: path.join(projectDir, 'src/repl/index.tsx'),
  output: {
    filename: 'repl.js',
    path: path.join(projectDir, 'repl')
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
            options: { extends: '../babel.config.js' }
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
        test: /\.wasm$/,
        type: 'webassembly/experimental'
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(projectDir, 'src/repl/index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new webpack.DefinePlugin({
      PRODUCTION: 'true'
    })
  ]
}
