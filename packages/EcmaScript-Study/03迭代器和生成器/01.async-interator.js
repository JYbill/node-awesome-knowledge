/**
 * @Description: 自定义迭代器
 * @Author: 小钦var
 * @Date: 2023/9/7 15:05
 */
const asyncIteratorObj = {
  num: 0,
  [Symbol.asyncIterator]() {
    return {
      next() {
        const num = asyncIteratorObj.num;
        if (num <= 10) {
          return Promise.resolve({
            value: asyncIteratorObj.num++,
            done: false,
          });
        } else {
          return Promise.resolve({ value: num, done: true });
        }
      },
    };
  },
};

async function main() {
  for await (const item of asyncIteratorObj) {
    console.log(item);
  }
}
main();
