type AnyFuncType = (...args: any[]) => any;

/**
 * 防抖函数：超过指定的间隔时间后，才能运行。场景：用户短时间内多次点击提交，只有第一次提交才有效
 * @param callback
 * @param timeout
 */
export function debounce<This = any>(callback: AnyFuncType, timeout: number) {
  let timer: number | null;

  return function (this: This, ...args: any[]) {
    if (timer) return;
    callback.apply(this, args);
    timer = setTimeout(() => {
      clearTimeout(timer as number);
      timer = null;
    }, timeout);
  };
}

function main() {
  let i = 0;
  const func = () => console.log(`running... ${i}`);
  const runFunc = debounce<any>(func, 1000);

  const timer = setInterval(() => {
    if (i >= 10) clearInterval(timer);
    runFunc();
    i++;
  }, 500);
}

main();
