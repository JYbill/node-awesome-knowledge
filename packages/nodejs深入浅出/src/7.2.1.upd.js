/**
 * @file: 7.2.1.upd.js
 * @author: xiaoqinvar
 * @desc：upd使用
 * @date: 2022-07-06 11:22:56
 */
var dgram = require('dgram');
var server = dgram.createSocket('udp4');

server.on('message', function (msg, rinfo) {
  console.log(
    'server got: ' + msg + ' from ' + rinfo.address + ':' + rinfo.port
  );
});
server.on('listening', function () {
  var address = server.address();
  console.log('server listening ' + address.address + ':' + address.port);
});

// 绑定7788端口 触发listening事件
server.bind(7788);
