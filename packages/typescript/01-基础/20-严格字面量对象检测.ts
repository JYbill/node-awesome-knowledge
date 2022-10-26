/**
 * @file: 20-严格字面量对象检测.ts
 * @author: xiaoqinvar
 * @desc：严格字面量对象检测
 * @date: 2022-10-22 10:49:42
 */
interface IPerson {
  name: string;
  age: number;
}
// 新鲜的fresh，进行严格的字面量类型检测
const p1: IPerson = {
  name: "xqv",
  age: 23,
  // height: 178, // ❌ 报错，因为进行严格检测发现height并不存在于IPerson类型中！
};
const p2 = {
  name: "xqv",
  age: 23,
  height: 178,
};
const p3: IPerson = p2; // ✅ p2赋给p3时进行了类型扩大，不再fresh，所以进行松散检测，允许有多余的属性
export {};
