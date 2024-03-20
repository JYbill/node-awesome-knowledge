import { Read, Write, Write2Read } from "./operation";

type ActiveEffectType = null | ((...args: any[]) => any);
const targetMap = new WeakMap<WeakKey, Map<string | symbol, any>>();
let activeEffect: ActiveEffectType = null;

/**
 * 解决嵌套effectFn()的依赖收集问题
 * 通过栈结构对应函数的执行顺序，入栈、出栈、指定栈帧
 * ```ts
 * function running() {
 *   function fn() {
 *     console.log("running");
 *     effect(() => {
 *       console.log("inner");
 *       p.name;
 *     });
 *     p.age;
 *   }
 *   fn();
 * }
 * effect(running);
 * p.age = 10; // 正常这里应该触发整个running()、内部函数
 * ```
 */
const effectStack: ActiveEffectType[] = [];

export function effect(fn: (...args: any[]) => any) {
  const effectWrapper = () => {
    activeEffect = effectWrapper; // 入栈的effectFn即为栈帧
    effectStack.push(activeEffect); // 入栈
    fn();
    effectStack.pop(); // 出栈
    activeEffect = effectStack.at(-1) || null; // 有effectFn函数即为栈帧，否则即为空
  };
  effectWrapper();
}

/**
 * 清理effectFn的依赖引用，然后重新设置
 * 原因：避免开发者的无效调用
 * ```ts
 * function running() {
 *   function fn() {
 *     console.log("running");
 *     if (p.age >= 18) {
 *       console.log(p.name);
 *     } else {
 *       console.log(p.del);
 *     }
 *   }
 *   fn();
 * }
 * effect(running);
 * p.age = 10;
 * // 此时应该只有"age"、"del"才会重新触发effectFn函数
 * p.name = "don't"; // expect: 不触发派发更新 ⚠️
 * ```
 */
function cleanup() {}

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

const ITERATOR_KEY = Symbol("iterator");

/**
 * 依赖收集
 * @param target
 * @param operation
 * @param key
 */
export function trace(target: any, operation: Read, key: string) {
  if (!triggerStatus || !activeEffect) return; // 依赖收集状态为暂停 || 用户的副作用没有执行，都停止依赖收集直接返回

  let propsMap = targetMap.get(target); // 属性Map
  if (!propsMap) {
    const map = new Map();
    targetMap.set(target, map);
    propsMap = map;
  }
  let typeKey: undefined | string | symbol;
  if (operation === Read.ITERATE) {
    typeKey = ITERATOR_KEY; // ⚠️ ITERATE一般是循环，是没有key的
  } else {
    typeKey = key;
  }
  let typeMap: undefined | Map<string | symbol, Set<any>> =
    propsMap.get(typeKey); // 类型Map
  if (!typeMap) {
    const map = new Map();
    propsMap.set(key, map);
    typeMap = map;
  }
  let deps = typeMap.get(operation); // 依赖收集的Set，内部全是effect函数
  if (!deps) {
    const set = new Set<ActiveEffectType>([activeEffect]);
    typeMap.set(operation, set);
    deps = set;
  }
  // console.log("debug", propsMap);
}

export function trigger(
  target: any,
  operation: Write,
  key: string,
  value?: any
) {
  const effectFns = getEffectFns(target, operation, key);
  for (const effectFn of effectFns) {
    effectFn();
  }
}

/**
 * 获取effect函数
 * @param target
 * @param operation
 * @param key
 */
function getEffectFns(target: any, operation: Write, key: string) {
  const effectFns = new Set<(...args: any[]) => any>([]);
  const propsMap = targetMap.get(target);
  if (!propsMap) return effectFns; // target不存在Map中

  // console.log("effectFns", key, operation, propsMap);
  const typeMap: Map<string | symbol, Set<any>> = propsMap.get(key);
  if (!typeMap) return effectFns;

  const ReadOperation: Read[] = Write2Read[operation]; // 获取写操作对应执行的读操作类型
  for (const readOpera of ReadOperation) {
    const deps = typeMap.get(readOpera);
    if (!deps) continue;
    for (const fn of deps) {
      effectFns.add(fn);
    }
  }
  return effectFns;
}
