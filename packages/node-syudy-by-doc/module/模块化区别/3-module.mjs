// 直接使用原始对象👍
/* import cjs from "./3-module.cjs";
export { cjs as core }; */

// 创建了一份新对象，这里解构就不对了❌
import { name, obj, updName } from "./3-module.cjs";
const newObj = {
  name, // 这里基本数据类型值拷贝(问题原因)
  obj, // 原始对象的引用
  updName, // // 原始对象的引用
};
export { newObj as core };
