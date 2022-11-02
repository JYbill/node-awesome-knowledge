/**
 * @file: 05-process.ts
 * @author: xiaoqinvar
 * @desc：process全局变量应用
 * @date: 2022-05-04 14:17:37
 */
// console.log(process); // process对象
// console.log(process.ppid); // 父进程id 98757
// console.log(process.pid); // 当前进程id 18032


// cpu memory
// Buffer.alloc(1000); // 会增加buffer占据的内存空间
// import fs from 'fs'; // 因为引入了模块，所以会增加node使用内存空间
// console.log(process.memoryUsage());
/*
{
  rss: 228745216, // 内存条常驻内存大小
  heapTotal: 95125504, // node程序申请的堆内存总数
  heapUsed: 72957272, // node程序使用的堆内存总数
  external: 3745734, // node程序扩展内存数，底层的c/c++模块
  arrayBuffers: 1760978 // 默认自带的buffer空间
}
*/

// cpu
// console.log(process.cpuUsage());
/*
  {
    user: 2063700, // 用户使用内存
    system: 115651 // 操作系统使用内存
  }
*/

// 当前工作目录
// console.log(process.cwd());

// 当前node版本
// console.log(process.version); // v14.19.1

// 获取当前底层版本（包括node版本）
// console.log(process.versions);

// 当前操作系统位数
// console.log(process.arch); // x64

// 获取本机系统环境变量
// console.log(process.env.PATH);

// 获取管理员目录
// console.log(process.env.USERPROFILE); // window操作系统下
// console.log(process.env.HOME); // mac操作系统下

// 当前操作系统平台
// console.log(process.platform); // darwin

// 启动参数
// console.log(process.argv);
// console.log(process.argv0);
// console.log(process.execArgv);

// 运行到结束时间
// console.log(process.uptime());

// process hook
/* process.on('beforeExit', (code) => {
  console.log(`before ${code}`);
  // setTimeout(() => {
  //   console.log('before setTimeout');
  // }, 0);
});

process.on('exit', (code) => {
  console.log(`exit ${code}`);
});

process.exit();
console.log('end.'); */

// process.stdout
/* import fs from 'fs';
import path from 'path';
fs.createReadStream(path.join(__dirname, '../assets/test.txt'), 'utf-8')
  .pipe(process.stdout); */

// process.stdin
// process.stdin.pipe(process.stdout);
// console.log(process.stdout.writable); // 可写流
// console.log(process.stdin.readable); // 可读流

// 流操作 事件订阅 事件回调
/* process.stdin.setDefaultEncoding('utf-8');
process.stdin.on('readable', () => {
  const chunk = process.stdin.read();
  if (chunk) {
    process.stdout.write('readable: ' + chunk);
    return;
  }
}) */