/**
 * @file: 8-函数重载和联合类型的选择.ts
 * @author: xiaoqinvar
 * @desc：函数重载和联合类型的选择
 * @date: 2022-10-18 20:41:39
 */
// 函数重载实现
function foo(arg: string): number;
function foo(arg: any[]): number;
function foo(arg: any) {
  return arg.length;
}

// 联合类型实现
function foo(arg: string | any[]) {
  return arg.length;
}

foo("1");
foo(["1", "2"]);
