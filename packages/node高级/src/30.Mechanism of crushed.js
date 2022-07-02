/**
 * @file: 30.Mechanism of crushed.js
 * @author: xiaoqinvar
 * @desc: 实现被压机制
 * @date: 2022-07-02 19:01:06
 */
const fs = require('fs');
const { resolve } = require('path');

const readPath = resolve(__dirname, '../assets/write.txt');
const writePath = resolve(__dirname, '../assets/write1.txt');
const rs = fs.createReadStream(readPath, {
  highWaterMark: 3,
});
const ws = fs.createWriteStream(writePath, {
  highWaterMark: 1,
});
rs.on('data', (chunk) => {
  while (ws.write(chunk)) {}
  rs.pause();
});

ws.on('drain', () => {
  console.log('cloud add some buffers.');
  rs.resume();
});
