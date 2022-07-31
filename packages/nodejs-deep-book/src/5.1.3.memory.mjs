const memory = process.memoryUsage();
console.log(memory);
console.log('v8目前已申请到的内存大小', memory.heapTotal / 1024 / 1024, 'M');
console.log('v8目前已使用到的内存大小', memory.heapUsed / 1024 / 1024, 'M');