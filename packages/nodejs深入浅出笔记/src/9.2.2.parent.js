/**
 * @file: 9.2.2.parent.js
 * @author: xiaoqinvar
 * @desc：父进程
 * @date: 2022-07-13 16:44:18
 */
/* var cp = require('child_process');
var n = cp.fork('./9.2.2.sub.js');
n.on('message', function (m) {
  console.log('PARENT got message:', m);
});
n.send({ hello: 'world' }); */

// 主进程只处理分发逻辑
const child = require('child_process');
const fork1 = child.fork('./9.2.2.sub.js');
const fork2 = child.fork('./9.2.2.sub.js');

var server = require('net').createServer();
// server.on('connection', function (socket) {
//   socket.end('handled by parent\n');
// });
server.listen(1337, function () {
  fork1.send('server', server);
  fork2.send('server', server);
  server.close();
});
