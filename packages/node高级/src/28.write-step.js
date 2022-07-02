/**
 * @file: 28.write-step.js
 * @author: xiaoqinvar
 * @desc：文件写入流步骤
 * @date: 2022-07-02 11:05:09
 */
const fs = require('fs');
const { join } = require('path');

const ws = fs.createWriteStream(join(__dirname, '../assets/write.txt'), {
  highWaterMark: 3,
});

let flag = ws.write('1');
console.log(ws._writableState.buffered);
console.log(flag);

flag = ws.write('2');
console.log(ws._writableState.buffered);
console.log(flag);

flag = ws.write('3');
// 这里说明所有的writeable.write(chunk)会先放入缓存，写入会异步执行
console.log(ws._writableState.buffered);
console.log(flag);

ws.on('error', (err) => {
  console.log(err);
});

// 同步后的第一次事件循环执行顺序如下
// next tick
process.nextTick(() => {
  console.log(ws._writableState.buffered);
});

// timer
setTimeout(() => {
  console.log(ws._writableState.buffered);
});

// 这里简化点: net pending, node内部调用的异步，普通的io统称为io
// io执行

// immediate
setImmediate(() => {
  console.log(ws._writableState.buffered);
});
