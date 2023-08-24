/**
 * @Description: Vue3.js 实现Proxy响应式
 * @Author: 小钦var
 * @Date: 2023/8/23 09:55
 */

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

/**
 * 副作用函数功能：包装函数，[[set]]执行时清理遗留的effectWrapper函数，避免重复执行
 * @param fn
 */
function effect(fn) {
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
    fn();
    effectStack.pop();
    activeFn = effectStack[effectStack.length - 1];
  };
  effectWrapper.deps = [];
  effectWrapper();
}

// 测试数据
const data = { text: "world", flag: true };

/**
 * 函数读取[[get]]的追踪器
 * @param target
 * @param field
 */
function trace(target, field) {
  // 非函数调用，直接代码调用情况。不做任何操作
  if (!activeFn || !target[field]) return;

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
    effectWrapper();
  });
}

const dataProxy = new Proxy(data, {
  get(target, field) {
    trace(target, field);
    return target[field];
  },
  set(target, field, value) {
    target[field] = value;
    trigger(target, field, value);
  },
});

/* 用例测试 */
console.log("================= 访问代理属性的值测试⬇️ =================");
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
effect(() => {
  dataProxy.text += " ok.";
  console.log("测试无限递归", dataProxy.text);
});

console.log("================= 访问代理属性的值测试⬆️ =================");

// 测试[[set]]
console.log("================= 设置代理属性的值测试⬇️ =================");
setTimeout(() => {
  // dataProxy.flag = false;
  dataProxy.text = "hello Proxy";
  console.log("================= 设置代理属性的值测试⬆️ =================");
}, 500);
