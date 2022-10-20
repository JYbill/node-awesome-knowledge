/**
 * @file: 12-readonly只读.ts
 * @author: xiaoqinvar
 * @desc：readonly只读
 * @date: 2022-10-20 20:08:35
 */
class Person {
  readonly name = "xiaoqinvar.";
  age = 23;
}
const p = new Person();
p.name, p.age;
p.age = 18;
// p.name = "human."; // ❌ name是只读属性无法修改

export {};
