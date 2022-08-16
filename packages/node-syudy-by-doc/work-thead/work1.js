const { parentPort } = require('worker_threads');
let counter = 0;
for (let i = 0; i < 2_000_000_000; i++) {
  counter++;
}
parentPort.postMessage(counter);

// 单线程同步耗时
/* const startTimeStamp = Date.now();
let counter = 0;
for (let i = 0; i < 2_000_000_000; i++) {
  counter++;
}
for (let i = 0; i < 2_000_000_000; i++) {
  counter++;
}
for (let i = 0; i < 2_000_000_000; i++) {
  counter++;
}
for (let i = 0; i < 2_000_000_000; i++) {
  counter++;
}
for (let i = 0; i < 2_000_000_000; i++) {
  counter++;
}
for (let i = 0; i < 2_000_000_000; i++) {
  counter++;
}
for (let i = 0; i < 2_000_000_000; i++) {
  counter++;
}
for (let i = 0; i < 2_000_000_000; i++) {
  counter++;
}
console.log('result: ', counter); // result:  16000000000
console.log('spending time: ', Date.now() - startTimeStamp); // spending time:  15217ms 15s
 */
