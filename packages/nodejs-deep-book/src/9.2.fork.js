/**
 * @file: 9.2.fork.js
 * @author: xiaoqinvar
 * @desc：fork
 * @date: 2022-07-13 16:08:37
 */
var { fork, execFile } = require('child_process');
var cpus = require('os').cpus();
// for (var i = 0; i < cpus.length; i++) {
//   fork('./9.2.process.js');
// }
