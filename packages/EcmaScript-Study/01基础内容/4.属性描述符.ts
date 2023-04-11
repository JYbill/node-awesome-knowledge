/**
 * @Description: 属性描述符
 * @Author: 小钦var
 * @Date: 2023/4/10 19:27
 */
const person = {
  name: "bill",
  age: 24,
  list: [1, 2, 3],
};
const descriptor = Object.getOwnPropertyDescriptor(person, "name");
console.log(descriptor); // { value: 'bill', writable: true, enumerable: true, configurable: true }

// 通过definePrototype修改对象
const personUpdate = Object.defineProperty(person, "name", {
  value: "xiaoqinvar",
  writable: false, // 无可重写
  enumerable: false, // 无法遍历获取该key，Object.keys(person)得不到"name"字段
  configurable: false, // 不允许再次修改属性描述符
});
console.log(person === personUpdate);
// person.name = "test"; // ❌ TypeError: Cannot assign to read only property 'name' of object '#<Object>'
console.log(Object.keys(person)); // ["age"]
console.log(person); // { age: 24 }
console.log(person.name); // xiaoqinvar
// Object.defineProperty(person, "name", { value: "test" }); // ❌ TypeError: Cannot redefine property: name

/**
 * Object.seal()
 */
const object1: Record<string, any> = {
  name: "seal",
};

Object.seal(object1);
object1.name = "upd.";
console.log(object1);
// object1.age = 100; // ❌ TypeError: Cannot add property age, object is not extensible
// delete object1.name; // ❌ TypeError: Cannot delete property 'name' of #<Object>
Object.defineProperty(object1, "name", {
  // enumerable: false, // ❌ 无法修改为不可枚举
  // configurable: true // ❌ 无法修改为true
});
