/**
 * 观察者，将所有key进行浅定义描述符，Vue2源码是深递归且判断freeze
 * @param object
 * @return {*}
 * @constructor
 */
export default function Observers(object) {
  for (const key in object) {
    let innerValue = object[key];
    const set = new Set();
    Object.defineProperty(object, key, {
      get() {
        if (window.__fn) {
          set.add(window.__fn);
        }
        return innerValue;
      },
      set(value) {
        innerValue = value;
        set.forEach((hook) => hook());
      },
    });
  }
}

/**
 * 得到当前正在调用的方法，将该方法存放在Object.defineProperty()下具体字段对应的set中
 * { name: "xxx", age: 20 }
 * "name"
 * innerValue = "xxx"                       innerValue = 20"
 * set = [...]                              set = [...]
 * Object.defineProperty("name")            Object.defineProperty("age")
 * @param fn
 */
export function autorun(fn) {
  window.__fn = fn;
  fn();
  window.__fn = null;
}
