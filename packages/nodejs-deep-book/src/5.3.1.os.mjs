import os from 'node:os';

console.log('系统总内存: ', os.totalmem());
console.log('系统空闲内存: ', os.freemem());
console.log(`----------------------------`);
const v8Memory = process.memoryUsage();
console.log(`v8申请内存大小:${v8Memory.heapTotal / 1024 / 1024}MB`);
console.log(`v8使用内存大小:${v8Memory.heapUsed / 1024 / 1024}MB`);


// 测试buffer占据v8内存之外的空间！
/* console.log(process.memoryUsage());
var useMem = function() {
  var size = 1 * 1024 * 1024;
  // const size = 2500; // 测试unsafe alloc
  // var buffer = Buffer.alloc(size);
  var buffer = Buffer.allocUnsafe(size); // 测试unsafe默认从rss中拿，不够再从内存中拿
  for (var i = 0; i < size; i++) {
    buffer[i] = 0;
  }
  return buffer;
};
const stayArr = [];
for (let index = 1; index <= 2; index++) {
  stayArr.push(useMem());
  const memory = process.memoryUsage();
  console.log(`v8总申请:${memory.heapTotal / 1024 / 1024} v8已使用${memory.heapUsed / 1024 / 1024} rss堆外内存: ${memory.rss / 1024 / 1024}`);
  console.log(`-----------------------`);
}
console.log(process.memoryUsage()); */

// 测试v8内存增加，rrs常驻内存是否会增加？
// 是：rrs包含v8内存
console.log(process.memoryUsage());
const addMemory = () => {
  const size = 1024 * 1024 * 10;
  const arr = new Array(size);
  return arr;
}

const result = [];
for (let index = 0; index < 20; index++) {
  result.push(addMemory());
}
console.log(process.memoryUsage());