/**
 * @file: 9-this推导.ts
 * @author: xiaoqinvar
 * @desc：this推导
 * @date: 2022-10-18 21:05:54
 */
// this上下文推导：this: { name: string; run(): void; }
const obj = {
  name: "xqv",
  run() {
    console.log(this.name, "running.");
  },
};
obj.run();

// 函数中使用this
// 第一个this参数会被忽略，传递的参数从第二开始
function foo(this: {}, arg: string) {
  console.log(this, arg);
}
foo.call({}, "hello");
// foo("hello"); // ❌ 这样调用等价于window.foo("hello")，但是并不知道window的类型

export {};
