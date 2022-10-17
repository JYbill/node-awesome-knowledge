/**
 * @file: 4-函数类型.ts
 * @author: xiaoqinvar
 * @desc：函数类型
 * @date: 2022-10-16 12:15:11
 */
// 函数类型
/* function foo(name: string): void {}
type fooFuncType = (name: string) => void;
let fooFunc1: fooFuncType = () => {
  return 123; // ✅ 编译通过
};
fooFunc1("xiaoqinvar");

// ❌ 如果有形参则必须满足fooFuncType类型的定义
let fooFunc2: fooFuncType = (name: number) => {
  return 123; // ✅ 编译通过
};
fooFunc2("xiaoqinvar"); */

// 函数类型题目：编写calcFn的函数类型 ✅
/* type calcCallbackType = (num1: number, num2: number) => number;

function calc(calcCallback: calcCallbackType) {
  const num1 = 10;
  const num2 = 20;
  return calcCallback(num1, num2);
}

function add(num1: number, num2: number) {
  return num1 + num2;
}

const res = calc(add);
console.log(res); */

// 函数签名
/* interface IFooFunc {
  name: string;
  (age: number): number;
}
const foo: IFooFunc = (age: number) => {
  return 1;
};
const age: number = foo(23);
console.log(foo.name); // foo.name: string */

// 函数类型参数个数问题模拟内部判断
/* type fooFuncType = (name: string) => void;
let fooFunc: fooFuncType = () => {};
type isPass = typeof fooFunc extends fooFuncType ? true : false; */

export {};
