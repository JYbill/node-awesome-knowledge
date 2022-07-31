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
/* const child = require('child_process');
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
}); */

// 子进程重启
var fork = require('child_process').fork;
var cpus = require('os').cpus();
var server = require('net').createServer();
server.listen(1337);
var workers = {};
var createWorker = function () {
  var worker = fork('./9.2.2.sub.js');

  // 监听到自杀信号重新创建子进程
  worker.on('message', function (message) {
    if (message.act === 'suicide') {
      createWorker();
    }
  });
  worker.on('exit', function () {
    console.log('Worker ' + worker.pid + ' exited.');
    delete workers[worker.pid];
  });
  // 句柄转发
  worker.send('server', server);
  workers[worker.pid] = worker;
  console.log('Create worker. pid: ' + worker.pid);
};
for (var i = 0; i < cpus.length; i++) {
  createWorker();
}
// 进程自己退出时，让所有工作进程退出
process.on('exit', function () {
  for (var pid in workers) {
    workers[pid].kill();
  }
});
