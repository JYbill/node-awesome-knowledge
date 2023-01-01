/**
 * @file: 3-main.mjs
 * @author: xiaoqinvar
 * @desc: 通过ESM包装cjs后，整条链路都是cjs规范
 * @dependencies:
 * @date: 2022-12-31 23:26:24
 */
import cjs from "./4-module.cjs";
import { core as coreM } from "./4-module.mjs";

// 引用修改全部受影响, 此时共享同一个对象
cjs.updName();
cjs.name = "蜘蛛";
console.log(coreM); // { name: '蜘蛛', obj: { name: 'ha.' }, updName: [Function: updName] }
console.log(cjs); // { name: '蜘蛛', obj: { name: 'ha.' }, updName: [Function: updName] }
