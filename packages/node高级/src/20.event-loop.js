/**
 * @file: 20.event-loop.js
 * @author: xiaoqinvar
 * @desc：事件循环
 * @date: 2022-06-19 15:09:38
 */
/* setImmediate(() => {
  console.log('imm1');
  setTimeout(() => {
    console.log('time2');
  });
});
setTimeout(() => {
  setImmediate(() => {
    console.log('imm2');
  });

  console.log('time1');
}); */

/* setTimeout(() => {
  console.log('time1');
});
setTimeout(() => {
  console.log('time2');
});
setTimeout(() => {
  console.log('time3');
});
setTimeout(() => {
  console.log('time4');
});
setTimeout(() => {
  console.log('time5');
});
setImmediate(() => {
  console.log('imm1');
});
setImmediate(() => {
  console.log('imm2');
}); */

/* process.nextTick(() => {
  console.log("next1");
});
process.nextTick(() => {
  console.log("next2");
});
setImmediate(() => {
  console.log("imm1");
  process.nextTick(() => {
    console.log("next3");
  });
});
Promise.resolve().then(() => {
  console.log("v");
});
setImmediate(() => {
  console.log("imm2");
  Promise.resolve().then(() => {
    console.log("v");
  });
});
setImmediate(() => {
  console.log("imm3");
}); */

/* setTimeout(() => {
  console.log('time 2');
  setImmediate(() => {
    console.log('imm 0');
  });
});
setImmediate(() => {
  console.log('imm 1');
  setTimeout(() => {
    console.log('time 1');
  });
}); */

/* 
// 事件循环按照6个队列依次执行
const fs = require('fs');
fs.readFile('./b,js', () => {
  setImmediate(() => {
    console.log(2);
  });

  setTimeout(() => {
    console.log(1);
  });
}); */

/* process.nextTick(() => console.log('nextTick延迟执行1'));
process.nextTick(() => console.log('nextTick延迟执行2'));
// 加入两个setImmediate()的回调函数
setImmediate(function () {
  setTimeout(() => {
    console.log('time');
  });
  setImmediate(() => {
    console.log('imm');
  });
  console.log('setImmediate延迟执行1');
  // 任务执行完成后，执行微任务，再执行队列后面check任务
  process.nextTick(() => console.log('强势插入'));
});
setImmediate(function () {
  console.log('setImmediate延迟执行2');
}); */
