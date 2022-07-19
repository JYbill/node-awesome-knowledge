/**
 * @file: 9.4.work.js
 * @author: xiaoqinvar
 * @desc：集群模式下的子进程
 * @date: 2022-07-19 16:03:34
 */
const http = require('http');

http
  .createServer(function (req, res) {
    console.log('come in');
    res.writeHead(200);
    res.end('hello world\n');
  })
  .listen(8000);
