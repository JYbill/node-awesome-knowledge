/**
 * @file: 18-索引签名.ts
 * @author: xiaoqinvar
 * @desc：索引签名
 * @date: 2022-10-21 22:53:09
 */
// 索引签名
/* interface IIterator {
  // 索引签名
  [index: string]: number;

  // 该属性受索引签名约束,
  // 如果返回其他类型，而索引签名要求返回number则会报错
  length: number;
}

type IteratorType = {
  [index: number]: string;

  // 这里index为number,这里没报错的原因是，数组默认原型包含length字段
  length: number;
};
const test1: IIterator = {
  age: 23,
  price: 18.9,
  length: 2,
};
const test2: IteratorType = ["1", "2"]; */

// 索引签名数组问题
/* interface IError {
  [index: string]: any;
}
interface IIterator {
  [index: string]: number;
}
const arr1: IError = [1, 2, 3];
const arr2: IIterator = [1, 2, 3]; // ❌ 索引为number
const arr3: IError = {};

// 对对象可以检测索引类型
const obj1: IError = { sex: 1, age: 22 };
const obj2: IError = { [0]: 1, [1]: 22 }; // ✅ 默认js索引number会转成string类型
const obj3: IIterator = { sex: 1, age: 22 };
const obj4: IIterator = { [0]: 1, [1]: 22 }; // ✅ 默认js索引number会转成string类型 */

// 索引签名数组问题 - [index: string]: string
/* interface IIndex {
  [index: string]: string;
}
// 尝试将arr改为非fresh新鲜的，扩展字面量
const arr = ["1", "2"];
// ❌ 字面量严格类型检测，索引默认为number无法通过
const arr1: IIndex = arr;
// ❌ 同上错误
const arr2: IIndex = ["1", "2"];
// ✅ 符合类型
const obj1: IIndex = {
  "0": "0",
  "2": "1",
};
// ✅ 符合类型，不要以为写的0就是个number了，实际上object的key都是string类型，所以这里通过
const obj2: IIndex = {
  0: "0",
  1: "1",
}; */

// 索引签名数组问题 - [index: number]: string
/* interface IIndex {
  [index: number]: string;
}
const obj: IIndex = {
  "0": "1",
}; */

// 奇怪的现象：[index: string]: any; 宽松索引签名
// any触发条件的宽松索引签名
/* interface IIndexInattentive {
  [index: number]: any;
}
// ✅ 你会发现
const arr1: IIndexInattentive = ["1", "2"];
const obj1: IIndexInattentive = {
  0: "0",
  1: "1",
  [Symbol("2")]: () => {},
};
// 空对象触发条件的索引签名
let obj3: {} = ["1", "2", 3, true];
obj3 = {
  k: "v",
  "0": 0,
  1: "1",
  // 甚至symbol都能通过
  [Symbol("3")]: () => {},
}; */

/* interface IIndexInattentive {
  [index: number]: string;
}
// ✅ 你会发现
const arr1: IIndexInattentive = ["1", "2"];
const obj1: IIndexInattentive = {
  0: "0",
  1: "1",
};

// 奇怪的现象论点：字面量隐式包含函数类型 ❌
/* interface IIndexSigWithFunc {
  [index: string]: string | ((...args: any[]) => any);
}
const arr1: IIndexSigWithFunc = ["1", "2"];
const obj1: IIndexSigWithFunc = {
  "0": "0",
  "2": "1",
  "3"() {},
}; */

// 索引签名允许同时支持两种索引类型
// 索引类型为"string"类型的返回值，必须是索引类型为"number"类型的返回值或返回值的子类型
/* class Animal {
  constructor(public age: number) {}
}
class Pig extends Animal {
  constructor(public name: string, age: number) {
    super(age);
  }
}
interface IBothIndexIterator {
  [index: number]: Pig; // 索引类型为number的返回值类型，必须为必须为Animal or Animal的子类型
  [index: string]: Animal;
}

// ❌ 错误演示
interface IErrorBothIndexIterator {
  [index: number]: object; // ❌ 索引类型为number的返回值类型不是Animal，反而是Animal的父类型
  [index: string]: Animal;
} */

// 字面量对象拥有隐式接口签名，而接口、类型则没有
/* interface IInfo {
  name: string;
}
type InfoType = { name: string };

function foo(param: { [key: string]: string }) {
  return param;
}

const testA: IInfo = { name: "xqv." };
const testB: InfoType = { name: "xqv." };
const testC = { name: "Xavier" };

foo(testA); // ❌ testA为定义索引签名
foo(testB);
foo(testC); */

export {};
