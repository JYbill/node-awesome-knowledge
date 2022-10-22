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
/* interface IIterator {
  [index: string]: any;
}
const arr: IIterator = [1, 2, 3];
const strArr: IIterator = ["1", "2", "3"];
const iterator: IIterator = {
  age: 22,
  sex: 1,
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
interface IIterator {
  [index: number]: Pig;
  [index: string]: Animal; // 必须为Animal or Animal的子类型
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
