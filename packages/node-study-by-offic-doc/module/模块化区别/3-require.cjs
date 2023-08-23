const m = require("./3-module.export.cjs");
console.log(m.title, m.author); // 博客 { uname: 'xiaoqinvar.' }
m.update();
console.log(m.title, m.author); // 博客 { uname: 'xiaoqinvar.' }
