// const module = require("./2-esm.module.mjs");
// console.log(module); // ❌ cjs不支持导入mjs

const m = require("./2-cjs.module.cjs");
console.log(m); // ✅
setTimeout(() => {
  console.log(m); // ✅ 只会对堆内存数据改变后同步，即基本类型值拷贝，引用类型拷贝指针
}, 200);
