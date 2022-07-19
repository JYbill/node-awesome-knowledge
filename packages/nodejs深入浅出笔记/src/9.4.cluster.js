/**
 * @file: 9.4.cluster.js
 * @author: xiaoqinvar
 * @desc：集群
 * @date: 2022-07-19 15:41:28
 */
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

for (var i = 0; i < numCPUs; i++) {
  cluster.setupMaster({
    exec: './9.4.work.js',
  });
  cluster.fork();
}
cluster.on('exit', function (worker, code, signal) {
  console.log('worker ' + worker.process.pid + ' died');
});
