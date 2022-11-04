/**
 * @file: 2-可读流可写流.js
 * @author: xiaoqinvar
 * @desc: 可读流可写流
 * @date: 2022-11-04 15:43:51
 */
const { ReadableStream, WritableStream } = require("node:stream/web");
const { setInterval, setTimeout: timer } = require("node:timers/promises");
const { performance } = require("node:perf_hooks");
const { Buffer } = require("node:buffer");

// 可读流
const readable = new ReadableStream(
  {
    async pull(controller) {
      await timer(500); // 500ms 读取一次
      const val = performance.now();
      controller.enqueue(val);
      console.log("队列剩余容量", controller.desiredSize);
    },
  },
  {
    highWaterMark: 5,
    size(chunk) {
      return 1;
    },
  },
);

// 可写流
const writeable = new WritableStream({
  write(chunk) {
    console.log("写入流接收到的数据", chunk);
  },
});

(async () => {
  readable.pipeTo(writeable);
})();
