// JSON 序列化
/* const person = {
  name: 'xiaoqinvar',
  age: 23,
  job: ['ts游戏开发', 'node全栈开发', 'wasm开发'],
  toJSON() {
    return 'to json';
  }
}
console.log(JSON.stringify(person, (key, value) => {
  if (key === 'age') {
    return;
  }
  return value;
}, 2));
console.log(JSON.stringify(person, ['name'], 2)); */

// JSON 反序列化
const person = {
  name: 'xiaoqinvar',
  age: 23,
  job: ['ts游戏开发', 'node全栈开发', 'wasm开发'],
}
const json = JSON.stringify(person);
JSON.parse(json, (key, value) => {
  if (key === 'job') {
    return 'my jobs'
  }
  return value;
});