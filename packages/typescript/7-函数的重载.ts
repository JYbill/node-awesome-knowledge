/**
 * @file: 7-函数的重载.ts
 * @author: xiaoqinvar
 * @desc：函数的重载
 * @date: 2022-10-18 19:57:52
 */
function foo(arg1: number, arg2: number): number;
function foo(arg1: string, arg2: string): string;
function foo(arg1: any, arg2: any) {
  return arg1 + arg2;
}
foo(1, 2);
foo("1", "2");
// foo(1, "2"); // ❌ 没有对应的重载签名
