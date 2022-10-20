// 微任务堵塞
/* setTimeout(() => console.log("定时器执行完毕."), 50);

// 微任务同步代码堵塞后续微任务、宏任务
new Promise((resolve, reject) => {
  const date = Date.now();
  while (Date.now() - date <= 2000) {}
  console.log("微任务执行完毕");
});
 */
setTimeout(() => {
  const date = Date.now();
  while (Date.now() - date <= 2000) {}
  console.log("500定时器任务执行完毕");
}, 500);

setTimeout(() => {
  console.log("550定时器任务执行完毕");
}, 550);
