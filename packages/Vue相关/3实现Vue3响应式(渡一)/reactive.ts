import { trace, trigger } from "./effect";

const weakMap = new WeakMap(); // 👍 weakMap的好处：因为weakKey是弱引用，当不再需要时会将key/value回收

export function reactive<T extends object>(obj: T): T {
  if (typeof obj !== "object") return obj; // 非对象
  if (weakMap.has(obj)) return weakMap.get(obj); // 已存在weakMap中，直接返回（必定是Proxy对象）

  const proxyObject = new Proxy(obj, {
    get(target: T, key: string, receiver: any) {
      // 🚀依赖收集
      trace(target, key);
      const result = Reflect.get(target, key, receiver);
      if (typeof result === "object") {
        return reactive(result as object);
      }
      return result; // 基础数据类型
    },
    set(target: T, key: string, newValue: any, receiver: any) {
      // 🚀派发更新
      trigger(target, key, newValue);
      return Reflect.set(target, key, newValue, receiver);
    },
  });
  weakMap.set(obj, proxyObject); // 👍 创建过的代理必定设置在weakMap缓存中
  return proxyObject;
}
