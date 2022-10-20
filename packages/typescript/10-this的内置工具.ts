/**
 * @file: 10-this的内置工具.ts
 * @author: xiaoqinvar
 * @desc：this的内置工具
 * @date: 2022-10-19 19:32:48
 */
function foo(this: { length: number }, name: string) {}

// 获取this类型
/* type FooType = typeof foo;
type GetThisType<T> = T extends (this: infer R, ...args: any[]) => any ? R : "";
type FooThisType = GetThisType<FooType>; */

// 获取this内置工具
// type FooThisType = ThisParameterType<typeof foo>;

// 使用OmitThisParameter工具类型
// type FooType = OmitThisParameter<typeof foo>;

// 使用ThisType工具
interface IPerson {
  name: string;
  age: number;
}
interface IState {
  man: IPerson;
  run(): void;
  say(): void;
}
const state: IState | ThisType<IPerson> = {
  man: {
    name: "xiaoqinvar",
    age: 23,
  },
  run() {
    // this: IPerson
    console.log(this.name);
  },
  say() {
    // this: IPerson
    console.log(this.name);
  },
};
(state as IState).run.call((state as IState).man);

export {};
