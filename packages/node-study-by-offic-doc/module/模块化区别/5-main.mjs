/**
 * @file: 5-main.mjs
 * @author: xiaoqinvar
 * @desc: esm/cjs双包下单例模式
 * @dependencies:
 * @date: 2023-01-01 14:18:30
 */
import esm from "./5-esm.mjs";
import cjs from "./5-core.cjs";

const coreESM = esm.init();
const coreCJS = cjs.init();
console.log(coreESM === coreCJS);
console.log("esm |", coreESM.title, coreESM.author); // esm | 博客 { uname: 'xiaoqinvar.' }
console.log("cjs |", coreCJS.title, coreCJS.author); // cjs | 博客 { uname: 'xiaoqinvar.' }
coreESM.update();
// coreCJS.update();
console.log("esm |", coreESM.title, coreESM.author); // esm | update title. { uname: 'aka. xqv yo.' }
console.log("cjs |", coreCJS.title, coreCJS.author); // cjs | update title. { uname: 'aka. xqv yo.' }
