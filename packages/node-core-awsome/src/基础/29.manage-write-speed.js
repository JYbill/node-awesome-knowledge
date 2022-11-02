/**
 * @file: 29.manage-write-speed.js
 * @author: xiaoqinvar
 * @desc：可写流限流操作
 * @date: 2022-07-02 18:00:53
 */
const fs = require('fs');
const { resolve } = require('path');
const path = resolve(__dirname, '../assets/write.txt');
const ws = fs.createWriteStream(path, { highWaterMark: 3 });

const source = 'lsadkasm啊是多少sadsa十大';
let index = 0;

function executeWriteBySpeed(source) {
  if (source.length <= index) {
    return;
  }
  let ret;
  while ((ret = ws.write(source[index++]))) {}
}

executeWriteBySpeed(source);
ws.on('drain', () => {
  console.log('writeable stream is clear');
  executeWriteBySpeed(source);
});
