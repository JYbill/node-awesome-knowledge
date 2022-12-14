/**
 * @file: 24.implement-duplex.js
 * @author: xiaoqinvar
 * @desc：实现双工流，可读又可写，但是writeable、readable是各自独立的
 * @date: 2022-06-26 12:00:41
 */
const { Duplex } = require('stream');

const source = ['1', '2', '3', '4', '5', '6', '7', '8'];

class MyDuplex extends Duplex {
  constructor(option) {
    super(option);
  }

  _write(chunk, encoding, callback) {
    process.stdout.write(chunk + '\n');
    callback();
  }

  _read() {
    const data = source.shift();
    this.push(data);
  }
}

const duplex = new MyDuplex();
duplex.on('data', (chunk) => {
  duplex.write(chunk);
});

// duplex.pipe(duplex); // 等价于上面'data'事件
