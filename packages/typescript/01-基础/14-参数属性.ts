/**
 * @file: 14-参数属性.ts
 * @author: xiaoqinvar
 * @desc：参数属性
 * @date: 2022-10-21 20:59:05
 */
class Person1 {
  name: string;
  private age: number;
  readonly sex: string;
  constructor(name: string, age: number, sex: string) {
    this.name = name;
    this.age = age;
    this.sex = sex;
  }
}

class Person2 {
  constructor(public name: string, private age: number, readonly sex: string) {}
}
const p = new Person2("xiaoqinvar", 23, "man");
console.log(p.name, p.sex);

export {};
