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

/**
 * GET 读取属性的依赖收集
 * @param target
 * @param key
 * @param receiver
 */
function get<T extends object>(target: T, key: string, receiver: any) {
  // 🚀依赖收集
  trace(target, Read.GET, key);

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
