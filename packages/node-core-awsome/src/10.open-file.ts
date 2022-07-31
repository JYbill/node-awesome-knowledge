/**
 * @file: 10.open-file.ts
 * @author: xiaoqinvar
 * @desc：文件打开关闭
 * @date: 2022-05-15 21:50:46
 */
import fs from 'node:fs';
import { resolve } from 'path';

const buf = Buffer.alloc(4);
fs.open(resolve('assets/test.txt'), 'r', (err, readFd) => {
  /**
   * fd: 打开标识fd文件
   * buffer: Buffer缓存
   * offset：Buffer偏移缓存
   * length：读取的长度(字节)
   * position: 从文件内的哪个位置开始读取
   * callback
   */
  fs.read(readFd, {
    buffer: buf,
    offset: 0,
    length: 4,
    position: 0,
  }, (error, len, buf) => {
    if (error) { throw error; }
    console.log(len);
    console.log(buf);
    console.log(buf.toString());
  });
});
