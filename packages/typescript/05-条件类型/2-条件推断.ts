/**
 * @file: 2-条件推断.ts
 * @author: xiaoqinvar
 * @desc：条件推断
 * @date: 2022-10-30 10:05:18
 */
type MyReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R
  ? R
  : never;
type MyParamType<T extends (...args: any[]) => any> = T extends (...args: infer P) => any
  ? P
  : never;

function add(arg1: string, arg2: number) {
  return arg1 + arg2;
}
type AddRetType = MyReturnType<typeof add>; // string
type AddParamType = MyParamType<typeof add>; // [arg1: string, arg2: number]

export {};
