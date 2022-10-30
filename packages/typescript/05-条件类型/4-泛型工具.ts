/**
 * @file: 4-泛型工具.ts
 * @author: xiaoqinvar
 * @desc：泛型工具
 * @date: 2022-10-30 11:01:58
 */
// Record
/* type MyRecord<K extends keyof any, V> = {
  [Key in keyof K]: V;
};

type MapType1 = Record<string, number>;
type MapType2 = MyRecord<string, number>; */

// Pick
/* type MyPick<O, K extends keyof O> = {
  [Key in K]: O[Key];
};

interface IPerson {
  readonly name: string;
  age?: number;
}

type TestPick1 = Pick<IPerson, "age">;
type TestPick2 = MyPick<IPerson, "name">; */

// Omit
/* type MyOmit<O, K extends keyof O> = {
  [Key in keyof O as Key extends K ? never : K]: O[Key];
};
interface IPerson {
  readonly name: string;
  age?: number;
}
type TestOmit = MyOmit<IPerson, "name">; */

// Exclude
/* type MyExclude<T, E extends T> = T extends E ? never : T;
type TestMyExclude = MyExclude<"sing" | "jump" | "rap", "sing">; */

// Extract
/* type MyExtract<T, I> = T extends I ? T : never;
type TestMyExtract = MyExtract<"sing" | "jump" | "rap", "sing" | "say">;
type test = Extract<"sing" | "jump" | "rap", "sing" | "say">; */

// NonNullable
/* type MyNonNullable<T> = T extends undefined | null ? never : T;
type TestMyNonNullable = NonNullable<"1" | 2 | null | undefined>; */

// InstanceType
/* class Person {}
class Cat {}

type MyInstanceType<T extends new (...args: any[]) => any> = T extends new (
  ...args: any[]
) => infer R
  ? R
  : never;

function factory<T extends new (...args: any[]) => any>(con: T, ...args: any[]): InstanceType<T> {
  return new con(args);
}

const person = factory(Person); // Person
const cat = factory(Cat); // Cat */

// keyof获取class
/* class Cat {
  constructor(public name: string) {}
}
type CatSigType = typeof Cat; // new (name: string) => Cat

function foo(arg1: number, arg2: string): boolean {
  return true;
}
type FnSigType = typeof foo; // (arg1: number, arg2: string) => boolean */

export {};
