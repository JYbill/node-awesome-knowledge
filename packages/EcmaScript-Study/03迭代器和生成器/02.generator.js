/**
 * @Description: 生成器
 * @Author: 小钦var
 * @Date: 2023/9/7 16:04
 */

// 使用生成器
/*function* sum(num1, num2) {
  return num1 + num2;
}

const total = sum(1, 2);
console.log(total); // Object [Generator] {}

const step = total.next();
console.log(step); // { value: 3, done: true }

const step2 = total.next();
console.log(step2); // { value: undefined, done: true }

console.log(total);*/

// yield关键字
/*
function* foo() {
  yield "one";
  yield "two";
  yield "three";
}
const sumGenerator = foo();
// const step1 = sumGenerator.next();
// console.log(step1);
// const step2 = sumGenerator.next();
// console.log(step2);
// const step3 = sumGenerator.next();
// console.log(step3);
// 解构、for...of 忽略done: false的迭代对象
// console.log(...sumGenerator);
for (const item of sumGenerator) {
  console.log(item);
}
*/

// yield委托
/*function* foo2() {
  yield 3;
  yield 4;
}
function* foo() {
  yield 1;
  yield 2;
  yield* foo2();
}

for (const num of foo()) {
  console.log(num); // 1 2 3 4
}*/

// yield值传递
/*function* foo() {
  const ask1 = yield 1;
  console.log(ask1);
  const ask2 = yield 2;
  console.log(ask2);
}

const fooGenerator = foo();
const step1 = fooGenerator.next(); // 开始
console.log(step1);
const step2 = fooGenerator.next("ask1");
console.log(step2);
const step3 = fooGenerator.next("ask2");
console.log(step3);
// { value: 1, done: false }
// ask1
// { value: 2, done: false }
// ask2
// { value: undefined, done: true }*/

// async/await
/*
function AsyncFunc(generatorFunc) {
  return new Promise((resolve) => {
    const promiseGenerator = generatorFunc();
    function handler(generator) {
      // 可迭代对象全部结束
      if (generator.done) {
        return resolve(generator.value);
      }

      // 执行迭代
      const value = generator.value;
      const next = generator.next;
      return Promise.resolve(value).then((res) => {
        handler(promiseGenerator.next(res));
      });
    }
    return handler(promiseGenerator.next());
  });
}
function* getUsers() {
  const res = yield fetch("https://jsonplaceholder.typicode.com/users");
  const json = yield res.json();
  return json;
}

const asyncFunc = AsyncFunc(getUsers);
asyncFunc.then((res) => {
  console.log("结果", res);
});
*/

// 异步迭代器
async function* asyncFoo() {
  yield "One";
  yield "Two";
}

/*const go = asyncFoo();
go.next().then((iterator) => console.log(iterator.value)); // One
go.next().then((iterator) => console.log(iterator.value)); // Two*/
/*async function main() {
  for await (const asyncItem of asyncFoo()) {
    console.log(asyncItem);
  }
}
main();*/

async function main() {
  const res = asyncFoo();
  console.log(res.next());
}
main();
