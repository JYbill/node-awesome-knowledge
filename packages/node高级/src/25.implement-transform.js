/**
 * @file: 25.implement-transform.js
 * @author: xiaoqinvar
 * @desc：实现转换流
 * @date: 2022-06-26 14:58:53
 */

const { Transform } = require('stream');

class MyTransform extends Transform {
  constructor(option) {
    super(option);
  }

  _transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback(null);
  }
}

const transform = new MyTransform();
transform.write('hello ');
transform.write('transform ');
transform.end('over.\n');
transform.pipe(process.stdout);

transform.on('end', () => {
  console.log('transform end.');
});
transform.on('close', () => {
  console.log('transform close.');
});
