/**
 * @file: 23.implement-writeable.js
 * @author: xiaoqinvar
 * @desc：可写流实现
 * @date: 2022-06-26 11:20:22
 */

const { Writable } = require('stream');

class MyWritable extends Writable {
  constructor(option) {
    super(option);
  }

  _write(chunk, encoding, callback) {
    process.stdout.write(chunk + ' ---- ');
    callback(null);
  }
}

const writeStream = new MyWritable();
writeStream.write('xiaoqinvar', 'utf8', () => {
  console.log('write.');
  // 需要手动end才能触发close事件
  // writeStream.end('over');
});

writeStream.on('finish', () => {
  console.log('writable finished');
});
writeStream.on('close', () => {
  console.log('writeable close');
});
