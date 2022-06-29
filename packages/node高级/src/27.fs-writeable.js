/**
 * @file: 27.fs-writeable.js
 * @author: xiaoqinvar
 * @desc：文件可写流学习
 * @date: 2022-06-29 20:38:24
 */
const fs = require('fs');
const ws = fs.createWriteStream('../assets/write.txt', {
  flags: 'w',
  mode: 0o666,
  fd: null,
  encoding: 'utf8',
  start: 0,
  highWaterMark: 1,
});

/* function drainWrite(string, callback) {
  ws.write(string, callback);
} */

ws.write('你在干什么呀', () => {
  console.log('写入ok1.');
  ws.end('结尾.');
});
ws.on('open', () => {
  console.log('open');
});
ws.on('close', () => {
  console.log('close.');
});

/* let i = 3;
ws.on('drain', () => {
  console.log('drain方法');
  if (i--) {
    drainWrite('测试这个方法怎么样\n');
  }
}); */
