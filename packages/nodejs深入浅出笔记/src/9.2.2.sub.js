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

const http = require('http');
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
