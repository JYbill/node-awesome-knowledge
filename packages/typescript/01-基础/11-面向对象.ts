/**
 * @file: 11-面向对象.ts
 * @author: xiaoqinvar
 * @desc：面向对象
 * @date: 2022-10-20 11:52:47
 */
class Person {
  // 在开启"strictPropertyInitialization"后，必须进行初始化
  // 方式一：
  /* name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  } */

  // 方式二：
  name: string = "xqv";
  age: number = 23;

  // 方式三：不推荐，使用了非空断言
  // name!: string;
  // age!: number;
}

const p1 = new Person();
console.log(p1.name);

export {};
