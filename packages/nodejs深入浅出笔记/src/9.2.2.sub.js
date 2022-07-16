/**
 * @file: 9.2.2.sub.js
 * @author: xiaoqinvar
 * @desc：子进程
 * @date: 2022-07-13 16:45:15
 */
/* process.on('message', function (m) {
  console.log('CHILD got message:', m);
});
process.send({ foo: 'bar' }); */

// 子进程通过句柄只占用一个端口
/* const http = require('http');
var server = http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('handled by child, pid is ' + process.pid + '\n');
});

process.on('message', function (m, tcp) {
  if (m === 'server') {
    tcp.on('connection', function (socket) {
      server.emit('connection', socket);
    });
  }
});
 */

// 自杀信号，提升服务器吞吐量
var http = require('http');
var server = http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('handled by child, pid is ' + process.pid + '\n');
  throw new Error('custom error to kill current process!');
});
var worker;
process.on('message', function (m, tcp) {
  if (m === 'server') {
    worker = tcp;
    worker.on('connection', function (socket) {
      server.emit('connection', socket);
    });
  }
});
process.on('uncaughtException', function () {
  // 关闭接受信号前，通知父进程，去创建一个新的子进程，我这个因为异常要关闭了
  process.send({ act: 'suicide' });
  // 停止接收新的连接
  worker.close(function () {
    process.exit(1);
  });
});
