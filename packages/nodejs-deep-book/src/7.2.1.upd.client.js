/**
 * @file: 7.2.1.upd.client.js
 * @author: xiaoqinvar
 * @desc：upd 客户端
 * @date: 2022-07-06 11:28:37
 */
var dgram = require('dgram');
var message = Buffer.from('深入浅出Node.js');

var client = dgram.createSocket('udp4');
client.send(
  message,
  0,
  message.length,
  7788,
  'localhost',
  function (err, bytes) {
    // 错误、成功发送的字节长度
    console.log(err, bytes);
    client.close();
  }
);
