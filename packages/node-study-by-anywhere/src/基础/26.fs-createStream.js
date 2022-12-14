/**
 * @file: 26.fs-createStream.js
 * @author: xiaoqinvar
 * @desc：fs可读流应用
 * @date: 2022-06-26 15:44:31
 */

const { createReadStream } = require('fs');
const { StringDecoder } = require('string_decoder');

const rs = createReadStream('../assets/copy.txt', {
  highWaterMark: 8, // 一次读取8字节的buffer，
  flags: 'r', // 默认，r：读取操作
  encoding: null, // 读取编码，默认二进制buffer
  fd: null, // 文件标识符
  mode: 0o666, // 文件模式：全权限模式
  autoClose: true, // 读取完毕 or 发生错误自动关闭
  start: 0, // 开始读取的位置0默认开头，没有指定end即读取所有
});
/* rs.on('data', (chunk) => {
  console.log(chunk);
  console.log(chunk.toString());
  // rs.pause();
  // setTimeout(() => {
  //   rs.resume();
  // }, 500);
}); */

/* rs.on('readable', () => {
  console.log(' -------- readable start -------- ');
  console.log('链表头部', rs._readableState.buffer.head);
  console.log('buffer长度', rs._readableState.length);
  const chunk = rs.read(2);
  if (chunk) {
    console.log(chunk);
    console.log(chunk.toString());
  } else {
    console.log('content is file end flag.');
    console.log(chunk);
  }
  console.log(' -------- readable end. -------- ');
});

// 1s内上面的'readable'绝对能走完，除非你电脑是上古电脑，那你调10s吧
setTimeout(() => {
  console.log(' -------- 定时器内容 -------- ');
  console.log('链表头部', rs._readableState.buffer.head);
  console.log('链表尾部', rs._readableState.buffer.tail);
  console.log('buffer长度', rs._readableState.length);
  let data;
  while ((data = rs.read(2)) !== null) {
    console.log(data);
    console.log(data.toString());
  }
  console.log(data);
  console.log('--------------------------');
}, 1000); */

/* rs.on('readable', () => {
  console.log(' ---- read ----');
  let data;
  while ((data = rs.read()) !== null) {
    console.log('链表头部', rs._readableState.buffer.head);
    console.log(data.toString());
  }
  console.log('data的值: ', data);
  console.log(' ---- end ----');
});

// 读取完毕会触发
rs.on('end', () => {
  console.log('file had been read');
});

// 可读流关闭触发
rs.on('close', () => {
  console.log('stream had been closed');
}); */
const stringDecoder = new StringDecoder('utf8');
rs.on('data', (chunk) => {
  const strBuffer = stringDecoder.write(chunk);
  console.log(strBuffer.toString());
});
