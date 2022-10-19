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
type FooThisType = ThisParameterType<typeof foo>;

export {};
