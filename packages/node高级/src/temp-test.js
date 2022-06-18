// console.log(module);

// 测试隐式toString()
/* class Person {
  get[Symbol.toStringTag]() {
    return 'xiaoqinvarType';
  }
}
console.log(Object.prototype.toString.call(new Person()));
 */
// 普通对象的隐式调用
// 判断触发 valueOf()
// 字符串拼接触发 valueOf() > toString()
/* const test = {
  valueOf() {
    return 'value';
  },
  toString() {
    return 'string';
  }
}
console.log(test == 'value');
console.log(test + ''); */

// 
/* const mongoose = require('mongoose');
const id = mongoose.Types.ObjectId;
const testId = new id();
// const id = mongoose.ObjectId('6143b55ac9a762738b15d4f0');
console.log(testId);
console.log(testId.id); */
/* const util = require('util');
const symbol = Symbol.for('nodejs.util.inspect.custom');
const Point = {
  name: 'xiaoqinvar',
  [symbol]: function() {
    return 'custom string';
  }
}
console.log(Point); */

// nodejs实现
/* const util = require('util');
const Point = {
  name: 'xiaoqinvar',
  [util.inspect.custom]: function() {
    return 'custom string';
  }
}
console.log(Point);
console.log(util.inspect.custom === Symbol.for('nodejs.util.inspect.custom')); */