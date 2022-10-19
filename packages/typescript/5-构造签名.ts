/**
 * @file: 5-构造签名.ts
 * @author: xiaoqinvar
 * @desc：构造函数签名
 * @date: 2022-10-18 09:18:27
 */
// ❌ 写法
// function foo () {}
// const foo = () => {};
// const f = new foo();

// 构造函数签名
class Person {}
// type newPersonType = new () => Person;
interface newPersonType {
  new (): Person;
}
function factory(fn: newPersonType) {
  return new fn();
}
export {};
