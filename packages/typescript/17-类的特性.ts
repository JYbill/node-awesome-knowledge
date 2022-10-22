/**
 * @file: 17-类的特性.ts
 * @author: xiaoqinvar
 * @desc：类的特性
 * @date: 2022-10-21 22:31:41
 */
class Person {}
// 1. 实例化对象
const p = new Person();

// 2. 类本身可以作为这个实例的类型
function foo(p: Person) {}
foo(p);

// 3. 类可以当作构造签名
function test(p: new () => void) {}
test(Person);

export {};
