import { name, obj } from "./1-cjs.module.cjs";
// import m, { name, obj } from "./1-ejs.module.mjs";

// 测试esm下export default导出为值拷贝，遵循cjs原则 ✅
/* console.log(m); // { name: 'x', obj: { uname: 'xiaoqinvar.' } }
setTimeout(() => {
  console.log(m); // { name: 'x', obj: { uname: 'aka' } }
}, 200); */

// 测试esm下export导出为值引用 ✅
/* console.log(name, obj); // x { uname: 'xiaoqinvar.' }
setTimeout(() => {
  console.log(name, obj); // yo. { uname: 'aka' }
}, 200); */

// 测试
