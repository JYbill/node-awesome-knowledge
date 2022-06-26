/**
 * @file: 22.implement-readable.js
 * @author: xiaoqinvar
 * @desc：可读流的实现
 * @date: 2022-06-25 19:41:43
 */

const { Readable } = require('stream');

class MyReadable extends Readable {
  constructor(option) {
    super(option);
  }

  source = [1, 2, 3, 4, 5];

  // Readable自己调用，外部调用不到
  _read(size) {
    // 以返回null为读取完毕
    const data = this.source.shift() || null;
    // 读取到的数据存入缓存
    if (data) {
      console.log('_read', data);
      this.push(`${data}`);
    } else {
      this.push(null);
    }
  }
}

const readStream = new MyReadable({
  // highWaterMark: 2,
});
readStream.on('readable', () => {
  console.log(' ---- read ---- ');
  let data;
  while ((data = readStream.read()) !== null) {
    // console.log('链表头部', readStream._readableState.buffer.head);
    // console.log('buffer长度', readStream._readableState.length);
    // console.log(data);
    console.log(data.toString());
  }
  console.log(' ---- end ----');
});
/* readStream.on('data', (chunk) => {
  console.log(chunk);
}); */

readStream.on('end', () => {
  console.log('stream end');
});
readStream.on('close', () => {
  console.log('stream close');
});
readStream.on('error', (error) => {
  console.log(error);
});

/* setTimeout(() => {
  console.log(1);
  console.log(readStream.read());
}, 500); */
