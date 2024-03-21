/**
 * @Description: Vue3 计算属性
 * @Author: 小钦var
 * @Date: 2024/3/21 9:48
 */
import {effect} from "./effect";

type ComputedFn = ((...args: any[]) => any);

export function computed(computedFn: ComputedFn) {
  let dirty = true; // 判断是否是脏数据，如果是需要重新计算，不是直接读cache走人
  let cache: any = null;
  const effectFn = effect(computedFn, {
    lazy: true,
    // 当计算属性内的依赖重新执行后，需要派发更新，这里派发更新的函数为scheduler()
    // 期望：不是更改时立即重新计算，而是更改后下一次的是用时，进行重新计算
    scheduler() {
      dirty = true;
    }
  });

  return {
    get value() {
      if (dirty) {
        // 脏数据
        dirty = false;
        cache = effectFn();
      }
      return cache;
    }
  }
}
