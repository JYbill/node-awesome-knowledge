import cjs from "./4-core.cjs";
import esm from "./4-esm.mjs";
console.log(cjs === esm); // true
console.log("cjs", cjs.title, esm.author); // cjs 博客 { uname: 'xiaoqinvar.' }
console.log("esm", esm.title, esm.author); // esm 博客 { uname: 'xiaoqinvar.' }
cjs.update();
console.log("cjs", cjs.title, esm.author); // cjs 博客 { uname: 'aka. xqv yo.' }
console.log("esm", esm.title, esm.author); // esm 博客 { uname: 'aka. xqv yo.' }
