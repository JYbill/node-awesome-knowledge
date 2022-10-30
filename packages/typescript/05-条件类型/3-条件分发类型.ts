/**
 * @file: 3-条件分发类型.ts
 * @author: xiaoqinvar
 * @desc：条件分发类型
 * @date: 2022-10-30 10:54:43
 */
// 不进行分发
// type toArrType<T> = T[];
// type numOrStrArr = toArrType<number | string>; // (string | number)[]

// 进行分发
type toArrType<T> = T extends any ? T[] : never;
type numOrStrArr = toArrType<number | string>; // string[] | number[]
export {};
