const path = require("path");
const webpack = require("webpack");

module.exports = {
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".wasm"]
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
    compress: true,
    port: 3000
  },
  entry: {
    ainsley: path.join(__dirname, "src/ainsley.ts"),
    bundle: path.join(__dirname, "src/index.tsx")
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "public"),
    library: "Ainsley",
    libraryTarget: "umd"
  },
  devtool: "eval-cheap-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: ["babel-loader", "eslint-loader"]
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [{ loader: "ts-loader" }, { loader: "eslint-loader" }]
      },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }]
      },
      {
        test: /\.(png|svg|jpg|gif)$/i,
        use: ["file-loader"]
      },
      {
        test: /\.wasm$/,
        type: "webassembly/experimental"
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: "true"
    })
  ]
};
