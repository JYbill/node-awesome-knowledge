/*
    思路：利用Proxy对象代理data对象
    [[get]] 代理对象时，记录Map（{field, Set}）并设置函数到对应的Set
    [[set]] 代理对象时，读取Map下的field，遍历对应所有Set并执行函数
*/
const bucket = new WeakMap();
/*
WeakMap：存储{Proxy代理对象, Map}
  - Map：存储{代理的field, Set}
    - Set：存储执行过field [[set]]的副作用方法
*/

// 当前正在执行的函数
const effectStack = []; // 存储effect函数的栈
let activeFn = undefined;

// 任务队列
const jobQueue = new Set();
let isFlushing = false;

function flushJob() {
  if (isFlushing) return;
  isFlushing = true;
  Promise.resolve().then(() => {
    jobQueue.forEach(fn => fn());
  });
}

/**
 * 副作用函数功能：包装函数，[[set]]执行时清理遗留的effectWrapper函数，避免重复执行
 * @param fn
 * @param options 选项
 */
function effect(fn, options) {
  const cleanup = (deps) => {
    for (const depSet of deps) {
      depSet.delete(effectWrapper);
    }
    effectWrapper.deps = [];
  };
  const effectWrapper = () => {
    cleanup(effectWrapper.deps); // 第一次初始化清空，后续每次[[set]]都会清空
    activeFn = effectWrapper;
    effectStack.push(effectWrapper);
    const res = fn();
    effectStack.pop();
    activeFn = effectStack[effectStack.length - 1];
    return res;
  };
  effectWrapper.options = options;
  effectWrapper.deps = [];
  if (!(options?.lazy)) {
    effectWrapper();
  } else {
    return effectWrapper;
  }
}

/**
 * 函数读取[[get]]的追踪器
 * @param target
 * @param field
 */
function trace(target, field) {
  // 非函数调用，直接代码调用情况。不做任何操作
  if (!activeFn || !Object.hasOwn(target, field)) return;

  // weakMap记录桶
  let map = bucket.get(target);
  // 存在map就一定存在set！！！
  // weakMap不存在，初始化WeakMap - Map - Set
  if (!map) {
    map = new Map();
    map.set(field, new Set());
    bucket.set(target, map);
  }

  // 此时，map一定是存在Map对象的，获取set设置副作用函数
  let set = map.get(field);
  if (!set) {
    set = new Set();
    map.set(field, set);
  }
  const effectWrapper = activeFn;
  effectWrapper.deps.push(set);
  set.add(effectWrapper);
  // console.log("debug get Map: ", field, set);
}

/**
 * 修改[[set]]时触发器
 */
function trigger(target, field, value) {
  // 不存在的值处理
  if (target[field] === undefined) {
    return;
  }

  // 不存在当前的代理
  const map = bucket.get(target);
  if (!map) {
    return;
  }

  // set存在但是没数据
  const set = map.get(field);
  if (!set || set.length <= 0) {
    return;
  }

  // 所有执行依赖函数
  const setRun = new Set();
  if (set) {
    set.forEach((effectWrapper) => {
      // 解决无限递归问题，当activeFn===effectWrapper说明，在一个effect里既有[[get]]同时存在[[set]]行为
      if (effectWrapper !== activeFn) {
        setRun.add(effectWrapper);
      }
    });
  }
  // 真实需要运行的依赖函数
  setRun.forEach((effectWrapper) => {
    if (effectWrapper?.options?.scheduler) {
      effectWrapper.options.scheduler(effectWrapper);
    } else {
      effectWrapper();
    }
  });
}

/**
 * 计算属性
 * @param fn
 * @return {{readonly value: undefined}|undefined}
 */
function computed(fn) {
  let res = undefined;
  let dirty = true;

  const effectFn = effect(fn, {
    lazy: true,
    scheduler() {
      if (!dirty) {
        dirty = true;
        trigger(computer, "value");
      }
    }
  });

  const computer = {
    get value() {
      if (dirty) {
        res = effectFn();
        dirty = false;
      }
      trace(computer, "value");
      return res;
    }
  }

  return computer;
}

/**
 * watch 监听器
 * @param obj {Object} 响应式对象
 * @param cb {function}
 *
 * @typedef {object} watchOptions
 * @property {string} immediate
 * @property {"post" | "sync"} flush 钩子执行时机 "post"微任务队列 "sync"同步
 * @param options {watchOptions}
 */
function watch(obj, cb, options) {

  /**
   * 遍历obj对象上的key，能够深度watch下触发监听器
   * @param obj {* | function}
   * @param seen {Set} 此Set的作用是防止obj存在循环依赖导致无限递归下去
   */
  function traverse(obj, seen = new Set()) {
    const flag = typeof obj !== "object" ||
      obj === null ||
      obj === undefined ||
      seen.has(obj);
    if (flag) return;

    seen.add(obj);
    for (const key in obj) {
      traverse(obj[key], seen);
    }
    return obj;
  }

  // 用户传入的是一个函数，表示只希望坚挺部分值，如：() => obj.text（只监听obj.text）
  let getter = () => traverse(obj);
  if (typeof obj === "function") {
    getter = obj;
  }

  // 竞态问题
  let cleanFn = undefined;
  function onInvalidate(fn) {
    cleanFn = fn;
  }

  // 旧值与新值
  let oldValue = undefined, newValue = undefined;
  // 任务调度：获取新值，替换旧值
  const job = () => {
    newValue = effectFn();

    // 清理"上一次"⚠️的竞态问题
    if (cleanFn) {
      cleanFn();
    }
    cb(newValue, oldValue, onInvalidate);
    oldValue = newValue;
  }
  const effectFn = effect(getter, {
    lazy: true,
    scheduler() {
      if (options?.flush === "post") {
        jobQueue.add(job);
        flushJob();
      } else {
        job();
      }
    },
  });

  // 存在立即执行参数
  if (options?.immediate) {
    job();
  } else {
    oldValue = effectFn();
  }
}

export default function (data) {
  return new Proxy(data, {
    get(target, field) {
      trace(target, field);
      return target[field];
    },
    set(target, field, value) {
      target[field] = value;
      trigger(target, field, value);
      return true;
    },
  });
}

export {
  effect, jobQueue, flushJob, computed, watch
}
