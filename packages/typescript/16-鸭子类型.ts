/**
 * @file: 16-鸭子类型.ts
 * @author: xiaoqinvar
 * @desc：鸭子类型检测
 * @date: 2022-10-21 22:22:02
 */
class Person {
  constructor(public name: string, public age: number) {}
}
class Pig {
  constructor(public name: string, public age: number) {}
}
let person: Person = new Person("xqv", 23);
person = new Pig("阿福", 1);
person = { name: "鸭子", age: 10 };

export {};
