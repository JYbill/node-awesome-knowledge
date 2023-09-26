const path = require("path");
const DllPlugin = require("webpack/lib/DllPlugin");

module.exports = {
  mode: "development",
  context: path.resolve(__dirname),
  resolve: {
    extensions: [".js"],
  },
  entry: {
    lodash: ["lodash"],
  },
  output: {
    path: path.join(__dirname, "dll"),
    filename: "[name].dll.js",
    library: "[name]_[fullhash]",
    clean: true,
  },
  plugins: [
    new DllPlugin({
      path: path.join(__dirname, "dll", "[name]-manifest.json"),
      name: "[name]_[fullhash]",
    }),
  ],
};
