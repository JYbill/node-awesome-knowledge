/**
 * @file: 02-single-thread.ts
 * @author: xiaoqinvar
 * @desc：nodejs单线程的缺点：不适合cpu密集型任务，也就是不适合同步代码过多的场景
 * @date: 2022-04-30 20:58:25
 */

import http from 'http';

// 堵塞代码
function spendTime(second: number) {
  const time = Date.now() + second * 1000;
  while (Date.now() < time) { }
}
spendTime(3);

// 3s后才能开启服务
http.createServer().listen(3000, () => {
  console.log('server lisente ::3000 port 😃.');
});