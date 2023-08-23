const vm = require("node:vm");

// 1. 通常情况下VM是无法访问主进程的
/*const xyz = vm.runInNewContext(`process`);
console.log(xyz);*/

// 2. 访问主进程
/*const xyz = vm.runInNewContext(
  `
  this.constructor.constructor("return this.process.pid")();
  `
);
console.log(xyz);*/

// 3. 逃逸带来的严重问题
/*const sandbox = {};
const script = new vm.Script(
  'this.constructor.constructor("return process")().exit()'
);
const context = vm.createContext(sandbox);
script.runInContext(context);
console.log("我还没上车呢... 😣");*/

// 4. 阻止逃逸问题
const script = new vm.Script('this.constructor.constructor("return this")()');
const context = vm.createContext(Object.create(null));
const res = script.runInContext(context);
console.log("vm返回的this：", res); // {} 没有原型的空对象
console.log("我还没上车呢... 😣"); // 会被执行
