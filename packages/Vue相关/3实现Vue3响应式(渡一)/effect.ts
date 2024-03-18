import { Read, Write } from "./operation";

type activeEffectType = null | ((...args: any[]) => any);
let activeEffect: activeEffectType = null;
const targetMap = new WeakMap();
export function effect(fn: (...args: any[]) => any) {
  const effectWrapper = () => {
    activeEffect = fn;
    fn();
    activeEffect = null;
  };
  effectWrapper();
}

/*
 * 依赖收集的状态，为true进行收集，为false不收集
 * 不进行依赖收集的原因：对于"某些方法内部调用而产生多余的依赖收集", 我们是不需要的
 * ```ts
 * arr.push(100); // 会收集[GET] push、[GET] length（length就是多余的依赖收集）
 * ```
 * */
let triggerStatus = true;
export function pauseTrigger() {
  triggerStatus = false;
}
export function resumeTrigger() {
  triggerStatus = true;
}

export function trace(target: any, operation: Read, key: string) {
  if (!triggerStatus || !activeEffect) return; // 依赖收集状态为暂停 || 用户的副作用没有执行，都停止依赖收集直接返回

  if (operation === Read.ITERATE) {
    // ⚠️ ITERATE一般是循环，是没有key的
    console.log("trace", target);
    return;
  }
  console.log(
    "trace",
    "target",
    // target,
    // "opera = ",
    operation,
    "key = ",
    key,
    ", value =",
    target[key]
  );
}

export function trigger(
  target: any,
  operation: Write,
  key: string,
  value?: any
) {
  if (operation === Write.DELETE) {
    console.log(`trigger[${operation}]`, `key=${key}`);
    return;
  }
  console.log(`trigger[${operation}]`, `key=${key}`, "最新值:", target[key]);
}
