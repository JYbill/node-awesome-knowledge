const { Worker } = require('worker_threads');
const os = require('os');

// 子线程
let startTimeStamp = Date.now();
let completeNumber = 0;
let result = 0;
for (let index = 0; index < os.cpus().length; index++) {
  const worker = new Worker('./work1.js');
  // 事件监听
  worker.on('message', (data) => {
    result += data;
    completeNumber++;

    // 8核，完成8次即表示结束
    if (completeNumber === os.cpus().length) {
      console.log('result: ', result); // result:  16000000000
      console.log('spending time: ', Date.now() - startTimeStamp); // spending time:  3007ms 3s
    }
  });
  worker.on('error', (error) => {
    console.error(error);
  });
}
console.log('start thread of son...');
