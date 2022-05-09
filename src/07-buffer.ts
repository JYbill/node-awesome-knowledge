/**
 * @file: 07-buffer.ts
 * @author: xiaoqinvar
 * @desc：buffer 学习
 * @date: 2022-05-07 19:30:50
 */
// const buffer1 = Buffer.alloc(1);
// const buffer2 = Buffer.allocUnsafe(1);
// console.log(buffer1);
// console.log(buffer2);

/**
 * buffer.from()
 */
/* const buffer3 = Buffer.from('中'); // utf8通过utf8表的值转16进制
console.log(buffer3); // <Buffer e4 b8 ad>

const buffer4 = Buffer.from([0xe4, 0xb8, 0xad]);
console.log(buffer4.toString()); // toString()会将buffer16进制通过utf8编码表转string */

/**
 * buffer.from() 内容来自Buffer
 */
/* const buffer5 = Buffer.from(Buffer.alloc(6));
console.log(buffer5); // <Buffer 00 00 00 00 00 00> */

/**
 * fill
 */
// const buf = Buffer.alloc(6);
// buf.fill('123', 1, 3);
// console.log(buf); // <Buffer 00 31 32 00 00 00>
// buf.fill(123);
// console.log(buf); // <Buffer 7b 7b 7b 7b 7b 7b>

/**
 * write
 */
// const buf = Buffer.alloc(6);
// buf.write('123', 1, 2);
// console.log(buf); // <Buffer 00 31 32 00 00 00>

/**
 * toString
 */
/* const buf = Buffer.from("你好时间");
console.log(buf.toString('utf-8', 3, 6)); // 好 */

/**
 * slice
 */
/* const buf = Buffer.from("你好");
const buf2 = buf.subarray(0, 3);
buf2[0] = 0;
console.log(buf); // <Buffer 00 bd a0 e5 a5 bd>
console.log(buf2); // <Buffer 00 bd a0> */

/**
 * indexOf
 */
/* const buf = Buffer.from("你好啊nodejs好啊");
const isSearch = buf.indexOf('好啊', 4); // 跳过第一个偏移地址
console.log(isSearch); // 15 */

/**
 * copy
 */
/* const buf = Buffer.from("你好");
const buf2 = Buffer.alloc(6);
buf.copy(buf2, 3, 3, 6);
console.log(buf); // <Buffer e4 bd a0 e5 a5 bd>
console.log(buf.toString()); // 你好
console.log(buf2); // <Buffer 00 00 00 e5 a5 bd>
console.log(buf2.toString()); // 好 */

/**
 * concat
 */
/* const buf1 = Buffer.from("你好");
const buf2 = Buffer.from("巴福");
const buf12 = Buffer.concat([buf1, buf2], 9);
console.log(buf12.toString()); */

/**
 * isBuffer
 */
/* const bool = Buffer.isBuffer(Buffer.from("ok"));
console.log(bool); // true */

/**
 * 自实现split方法
 */
/* function split(buf: Buffer, separator: string) {
  const separatorLength = Buffer.from(separator).length;
  let retBufferArray = [];
  let start = 0;
  let offset = 0;

  while ((offset = buf.indexOf(separator, start)) !== -1) {
    const buffItem = buf.subarray(start, offset);
    retBufferArray.push(buffItem);
    start = offset + separatorLength;
  }
  return retBufferArray;
}

const buf = Buffer.from("我爱吃大米，你爱吃小米，我们都爱吃吃");
const res = split(buf, "吃");
console.log(res);
res.forEach(item => {
  console.log(item.toString());
}) */