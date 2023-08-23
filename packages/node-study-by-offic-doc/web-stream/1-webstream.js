const { ReadableStream } = require("node:stream/web");
const { setInterval, setTimeout: timer } = require("node:timers/promises");
const { performance } = require("node:perf_hooks");
const { Buffer } = require("node:buffer");

const readable = new ReadableStream(
  {
    // 开始事件
    async start(controller) {
      console.log("start.");
    },

    // 当内置队列未满时，一直读取，如果为异步则等待异步完成后再次调用
    async pull(controller) {
      await timer(100); // 500ms 读取一次
      const val = performance.now();
      controller.enqueue(val);
      console.log("队列剩余容量", controller.desiredSize);
    },

    // 取消事件
    cancel(reason) {
      console.log(reason);
    },
  },
  {
    highWaterMark: 5,
    // 根据返回的number大小，水平线 - size大小 = 当前剩余容量(controller.desiredSize)
    size(chunk) {
      return 1;
    },
  },
);

(async () => {
  // 消费5次
  const reader = readable.getReader(); // 默认的reader实例，允许js值(如：对象...)
  for (let index = 1; index <= 5; index++) {
    console.log(await reader.read());
  }

  // 2s后消费3次
  setTimeout(async () => {
    console.log(await reader.read());
    console.log(await reader.read());
    console.log(await reader.read());
  }, 2000);
})();
