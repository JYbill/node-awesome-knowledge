/**
 * @file: promisify.js
 * @author: xiaoqinvar
 * @desc: 使用promisify工具方法
 * @date: 2022-12-14 15:29:20
 */
const util = require("node:util");
const fn = (callback) => {
  setTimeout(() => {
    callback(null, "123");
  }, 1000);
};

const res = util.promisify(fn);
res().then((res) => {
  console.log(res);
});
