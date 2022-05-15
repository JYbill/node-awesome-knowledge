/**
 * @file: 11.copy-file.ts
 * @author: xiaoqinvar
 * @desc：通过buffer fs.open实现二进制文件的复制
 * @date: 2022-05-15 23:03:29
 */
import fs from 'fs';
import { resolve } from 'path';

// 按1M读取
const buf = Buffer.alloc(1024 * 1024);

let readIndex = 0;
fs.open(resolve('assets/target.png'), 'r', (err, readFd) => {
  fs.read(readFd, {
    buffer: buf,
    length: buf.length,
    position: readIndex
  }, (err, len, buf) => {
    console.log(buf);
  })
});