import { trace, trigger } from "./effect";
import { Read, Write } from "./operation";
import { hasChanged } from "./utils";

const weakMap = new WeakMap(); // 👍 weakMap的好处：因为weakKey是弱引用，当不再需要时会将key/value回收

export function reactive<T extends object>(obj: T): T {
  if (typeof obj !== "object") return obj; // 非对象
  if (weakMap.has(obj)) return weakMap.get(obj); // 已存在weakMap中，直接返回（必定是Proxy对象）

  const proxyObject = new Proxy(obj, {
    get,
    set,
    has,
    deleteProperty,
  });
  weakMap.set(obj, proxyObject); // 👍 创建过的代理必定设置在weakMap缓存中
  return proxyObject;
}

type arrayInstrumentType = {
  [funcName: string]: (...args: any[]) => boolean | number;
};
const ORIGIN = Symbol("origin");
const arrayInstrument: arrayInstrumentType = {}; // 重写的Array查找方法
["includes", "indexOf", "lastIndexOf"].forEach((funcName: string) => {
  arrayInstrument[funcName] = function (this: any, ...args: any[]) {
    let result = Array.prototype[funcName as any].apply(this, args); // this：Proxy对象
    if ((result as number) <= -1 || !result) {
      // 此时，Proxy对象肯定未查找到
      result = Array.prototype[funcName as any].apply(this[ORIGIN], args);
    }
    return result;
  };
});

/**
 * GET 读取属性的依赖收集
 * @param target
 * @param key
 * @param receiver
 */
function get<T extends object>(target: T, key: string | symbol, receiver: any) {
  // 提供arrayInstrument拿到原始对象
  if (key === ORIGIN || typeof key === "symbol") {
    return target;
  }

  // 🚀依赖收集
  trace(target, Read.GET, key);

  // ⚠️ 数组的查找方法，问题：查到对象元素时会返回proxy对象，如果是proxy对象则为代理的代理，所以永远不可能访问到
  // 解决方案1：传入的对象转为proxy对象 且 reactive对于proxy对象直接返回
  // 解决方案2：使用代理数组方法查找，如果找不到再使用原始数组对象查找（Vue3👍）
  //  缺点：代理数组方法查找，会额外触发多余的依赖收集
  if (arrayInstrument.hasOwnProperty(key)) {
    return arrayInstrument[key].bind(receiver); // 传递this指向为proxy对象
  }

  /*
   * 🚩这里为什么要传递一个receiver?
   * 原因：这里为了获取，形如
   * ```ts
   * {
   *   name: "xiaoqinvar",
   *   age: 24,
   *   get username() {
   *     return this.name + this.age;
   *   }
   * }
   * ```
   * 我们通过receiver(proxy实例的this指向)，可以帮助我们完成"name"、"age"的依赖收集
   * */
  const result = Reflect.get(target, key, receiver);
  if (typeof result === "object") {
    return reactive(result as object);
  }
  return result; // 基础数据类型
}

/**
 * in 读取属性的依赖收集
 * @param target
 * @param key
 */
function has<T extends object>(target: T, key: string): boolean {
  // ⚠️ 需要判断这个属性是否存在，不存在没必要去依赖收集
  const result = Reflect.has(target, key);
  if (!result) return result;

  // 🚀派发更新
  trace(target, Read.IN, key);
  return result;
}

/**
 * SET 设置属性的依赖收集
 * @param target
 * @param key
 * @param newValue
 * @param receiver
 */
function set<T extends object>(
  target: T,
  key: string,
  newValue: any,
  receiver: any
) {
  // 🚀派发更新
  const exist = target.hasOwnProperty(key);
  const operation = exist ? Write.SET : Write.ADD; // 存在属性即更新，不存在即添加
  // ⚠️ 这里不要用receiver避免多余的依赖收集
  const oldValue = Reflect.get(target, key);

  if (hasChanged(newValue, oldValue) || !exist) {
    // 值有变化 || 值新增
    trigger(target, operation, key, newValue);
  }

  // trigger(target, operation, key, newValue);
  return Reflect.set(target, key, newValue, receiver);
}

/**
 * DELETE 删除属性
 * @param target
 * @param key
 */
function deleteProperty<T extends object>(target: T, key: string) {
  const exist = target.hasOwnProperty(key);
  const result = Reflect.deleteProperty(target, key);

  if (exist && result) {
    // 🚀属性存在，删除成功情况下，才派发更新
    trigger(target, Write.DELETE, key);
  }

  return result;
}
