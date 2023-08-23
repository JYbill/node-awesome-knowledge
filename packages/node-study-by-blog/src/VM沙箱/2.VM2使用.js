const { VM } = require("vm2");

// 1. 初体验
/*try {
  new VM().run('this.constructor.constructor("return process")().exit()');
} catch (err) {
  console.log("vm2抛出的异常", err);
}
console.log("试试会不会被杀掉进程"); // 正常运行
*/

// 2. 通过创建异步钩子，让vm2无法结束
const vm = new VM({ timeout: 1000, sandbox: {} });
const res = vm.run(`
new Promise((resolve) => {
  resolve("ok");
})
`);
console.log(res);
