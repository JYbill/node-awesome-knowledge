const fs = require('fs')
const async_hooks = require('async_hooks');
const { fd } = process.stdout;

const writeSomething = (phase, more) => {
  fs.writeSync(fd, `Msg: "${phase}", ExecAsyncId: ${async_hooks.executionAsyncId()}\n`);
};

async_hooks.createHook({
  init(asyncId, type, triggerAsyncId) {
    const msg = `init, type=${type}, asyncId=${asyncId}, triggerAsyncId=${triggerAsyncId}`;
    writeSomething(msg)
  },
  promiseResolve(asyncId) {
    const msg = `promiseResolve, asyncId=${asyncId}`;
    writeSomething(msg)
  },
  before(asyncId) {
    const msg = `bf, asyncId=${asyncId}`;
    writeSomething(msg)
  },
  after(asyncId) {
    const msg = `af, asyncId=${asyncId}`;
    writeSomething(msg)
  },
  destroy(asyncId) {
    const msg = `destroy, asyncId=${asyncId}`;
    writeSomething(msg)
  },
}).enable();

writeSomething("同步代码块");

/**
 * 宏任务队列
 */
/*writeSomething("timeout " + async_hooks.executionAsyncId());
setTimeout(() => {
  function test() {
    writeSomething("timeout " + async_hooks.executionAsyncId());
  }
  test();
}, 1000);*/

/**
 * 微任务队列
 */
/*new Promise((resolve, reject) => {
  resolve(1);
}).then(() => {
  writeSomething(async_hooks.executionAsyncId());
}).catch()*/
