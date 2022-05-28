import os from 'node:os';

console.log('系统总内存: ', os.totalmem());
console.log('系统空闲内存: ', os.freemem());
console.log(`----------------------------`);
const v8Memory = process.memoryUsage();
console.log(`v8申请内存大小:${v8Memory.heapTotal / 1024 / 1024}MB`);
console.log(`v8使用内存大小:${v8Memory.heapUsed / 1024 / 1024}MB`);


// 测试buffer占据v8内存之外的空间！
console.log(process.memoryUsage());
var useMem = function() {
  // var size = 1 * 1024 * 1024;
  const size = 2500; // 测试unsafe alloc
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
console.log(process.memoryUsage());