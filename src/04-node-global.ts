/**
 * @file: 03-node-global.ts
 * @author: xiaoqinvar
 * @desc：node全局对象
 * @date: 2022-05-03 11:11:54
 */
// console.log(global); // 全局对象

// console.log(this); // this === {}

// 自执行匿名函数的this = global全局对象，因为模块化规则
/* (function () {
  console.log(this);
})() */

// 箭头函数的this的作用域为外层，所以this = global
/* (() => {
  console.log(this);
})(); */

