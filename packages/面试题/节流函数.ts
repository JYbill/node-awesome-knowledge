/**
 * @Description: 节流函数：立即执行第一次，往后，在延迟时间内的所有触发，在结束后执行。场景：用户输入框搜索，在输入完毕后才出现提示内容
 * @Author: 小钦var
 * @Date: 2024/3/13 14:02
 */
/**
 * 例子：500ms间隔
 * |------------------------|------------------------|--------- ... ------------|
 * 开始(立即执行一次)        100ms(不执行)            200ms(不执行)           500ms(不运行，但额外触发一次)
 * 运行                     运行                     运行                       运行
 */

// 节流版本一：只能触发后过一段时间运行
export function throttle(callback: (...args: any[]) => void, ms: number) {
  let timer: number | null = null;

  return function (this: any, ...args: any[]) {
    const context = this;
    if (timer) return; // 说明在延时时间范围内
    // @ts-ignore
    timer = setTimeout(() => {
      callback.call(context, args);
      timer = null;
    }, ms);
  }
}

function test() {
  const runner = throttle(() => console.log("测试节流函数"), 500);
  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      runner();
    }, i * 300);
  }
}
test();
