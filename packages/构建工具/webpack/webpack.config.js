// plugins
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

const path = require("path");

const mode = "development";
const cssFilename =
  mode === "development" ? "[name].css" : "[name].[contenthash:8].css";

module.exports = {
  /* **************************** Entry配置（开始） **************************** */
  /**
   * context: string(绝对路径字符串)
   * 作用：webpack默认context为执行cli命令的目录；在使用相对路径时，以"context"参考根目录
   */
  context: path.resolve(__dirname),

  /**
   * @type {string | string[] | {string: string | string[]}} entry
   * @description
   * 作用：入口
   * 例子：MPA（多页面应用）多个入口
   * ```ts
   *   entry: {
   *     home: './home.js',
   *     about: './about.js',
   *     contact: './contact.js',
   *   },
   * ```
   */
  entry: "./01.main.js", // 入口
  mode,
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: "bundle.js",
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, "./dist"),
    clean: true, // 清空输出文件夹
  },
  /* **************************** Entry配置（结束） **************************** */

  devtool: "source-map",

  /* **************************** Plugin配置（开始） **************************** */
  plugins: [
    // 抽取CSS为单独文件的插件
    new MiniCssExtractPlugin({
      filename: cssFilename, // 计算8位的哈希值
      chunkFilename: cssFilename, // 非入口文件引入的chunk名
      ignoreOrder: false,
    }),
  ],
  /* **************************** Plugin配置（结束） **************************** */

  /* **************************** Loader配置（开始） **************************** */
  module: {
    rules: [
      {
        // 用正则去匹配要用该 loader 转换的 CSS 文件
        test: /\.css$/,
        use: [
          // "style-loader",
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../",
            },
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  /* **************************** Loader配置（结束） **************************** */

  /* **************************** DevServe配置（开始） **************************** */
  devServer: {},
  /* **************************** DevServe配置（结束） **************************** */
};
