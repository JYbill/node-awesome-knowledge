/**
 * @Description: Vue3.js 实现Proxy响应式
 * @Author: 小钦var
 * @Date: 2023/8/23 09:55
 */
import Proxy, {effect} from "./proxy.mjs";

// 测试数据
const dataProxy = Proxy({text: "world", flag: true});
/* 用例测试 */
/*effect(() => {
  // fn1
  console.log("test1", dataProxy.text);
});*/

// 不存在的值测试
/*effect(function () {
  // fn3应该要被忽略
  console.log("test3", dataProxy["aka"]);
});*/

// 分支测试
/*effect(function effect4() {
  // fn4：分支切换和cleanup
  console.log("test4", dataProxy.flag ? dataProxy.text : "not ok!");
});*/

// 嵌套effect测试
/*effect(function wrapper1() {
  console.log("wrapper1 running...");
  effect(function wrapper2() {
    console.log("wrapper2 running...");
    console.log("[[get]] dataProxy.flag", dataProxy.flag);
  });
  console.log("[[get]] dataProxy.text", dataProxy.text);
});*/

// 无限递归测试
/*effect(() => {
  dataProxy.text += " ok.";
  console.log("测试无限递归", dataProxy.text);
});*/

// 可调度功能
effect(
  () => {
    console.log("读取", dataProxy.text);
  },
  {
    scheduler(fn) {
      console.log(1)
      setTimeout(() => {
        fn();
      }, 500);
    },
  }
);
dataProxy.text = "调度功能";
console.log("调度结束");

// console.log("================= 访问代理属性的值测试⬆️ =================");

// 测试[[set]]
// console.log("================= 设置代理属性的值测试⬇️ =================");
// setTimeout(() => {
// dataProxy.flag = false;
// dataProxy.text = "hello Proxy";
// }, 500);
