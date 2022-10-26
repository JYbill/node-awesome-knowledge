/**
 * @file: 23-泛型约束.ts
 * @author: xiaoqinvar
 * @desc：泛型约束
 * @date: 2022-10-24 19:22:01
 */
/**
 * 基本约束
 */
/* function foo<T extends { length: number }>(arg: T) {
  return arg;
}
// number[]
const arr = foo([1, 2]);
// string
const str = foo("12");
// { length: number; name: string; }
const obj = foo({ length: 0, name: "xqv" }); */

/**
 * 将泛型作为参数进行约束
 */
/* function foo<O, K extends keyof O>(obj: O, key: K) {
  return obj[key];
}
const person = {
  name: "xqv",
  age: 23,
};
// string
const name = foo(person, "name");
// number
const age = foo(person, "age"); */

/**
 * 映射类型
 */
// ⚠️ 映射类型仅type可以使用，interface接口无法使用
/* type Reflect<T> = {
  [Key in keyof T]: T[Key];
};
interface IPerson {
  name: string;
  age: number;
}

type PersonType = Reflect<IPerson>;
// type PersonType = {
//   name: string;
//   age: number;
// } */

/**
 * 映射类型添加修饰符
 */
/* type Reflect<T> = {
  readonly // 只读
  [K in keyof T]?: T[K];
};
interface IPerson {
  name: string;
  age: number;
}
type PersonType = Reflect<IPerson>;
// type PersonType = {
//   readonly name?: string | undefined;
//   readonly age?: number | undefined;
// } */

/**
 * 映射类型通过前缀来修改添加/删除修饰符
 */
/* type Reflect<T> = {
  -readonly [Key in keyof T]-?: T[Key];
};
interface IPerson {
  readonly name?: string;
  readonly age?: number;
}
type PersonRequiredType = Reflect<IPerson>;
// type PersonRequiredType = {
//   name: string;
//   age: number;
// } */

export {};
