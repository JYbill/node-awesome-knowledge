// 测试：export值引用 ✅
/* import { title, author, update } from "./3-export.mjs";
console.log(title, author); // 博客 { uname: 'xiaoqinvar.' }
update();
console.log(title, author); // update title. { uname: 'aka. xqv yo.' } */

// 测试：export default值拷贝 ✅
import m from "./3-export-default.mjs";
const { title, author, update } = m;
console.log(title, author); // 博客 { uname: 'xiaoqinvar.' }
update();
console.log(title, author); // 博客 { uname: 'aka. xqv yo.' }
