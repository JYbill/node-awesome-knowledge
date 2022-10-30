/**
 * @file: 1-条件类型.ts
 * @author: xiaoqinvar
 * @desc：条件类型
 * @date: 2022-10-29 21:05:24
 */
function add<T extends number | string>(arg1: T, arg2: T): T extends number ? number : string;
function add(arg1: any, arg2: any) {
  return arg1 + arg2;
}
add(1, 1); // number
add("1", "1"); // string
// add(1, "1"); // ❌

export {};
