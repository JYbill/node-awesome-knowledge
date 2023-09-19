function log() {
  console.log("hello webpack");
}

require("./01.hello.css");
log();
console.log("测试监听文件更改！");
module.exports = log;
