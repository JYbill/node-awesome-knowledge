const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  devtool: "inline-source-map",
  output: {
    path: path.resolve(__dirname, "./src"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".js", ".mjs", ".cjs", ".json", ".ts"],
  },
  devServer: {},
  module: {
    rules: [
      {
        test: /.ts$/,
        loader: "ts-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
  experiments: {
    topLevelAwait: true,
  },
};
