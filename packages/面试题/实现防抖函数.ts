type AnyFuncType = (...args: any[]) => any;

export function debounce<This = any>(callback: AnyFuncType, timeout: number) {
  let timer: NodeJS.Timer | number | null;

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
