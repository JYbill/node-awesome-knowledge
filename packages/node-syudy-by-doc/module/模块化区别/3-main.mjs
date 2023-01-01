/**
 * @file: 3-main.mjs
 * @author: xiaoqinvar
 * @desc: 通过ESM包装cjs后，整条链路都是cjs规范
 * @dependencies:
 * @date: 2022-12-31 23:26:24
 */
import { core } from "./3-module.mjs";
import cjs from "./3-module.cjs";

// esm引入cjs是cjs规范，所以整条路都是cjs规范
cjs.updName(); // 引用修改全部受影响
cjs.name = "蜘蛛"; // 基本数据值拷贝，只影响单个包
console.log(core); // { nameM: 'y', objM: { name: 'ha.' } }
console.log(cjs); // { name: '蜘蛛', obj: { name: 'ha.' }, updName: [Function: updName] }
