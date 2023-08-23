/**
 * @file: 2-可读流可写流.js
 * @author: xiaoqinvar
 * @desc: 可读流可写流
 * @date: 2022-11-04 15:43:51
 */
const { ReadableStream, WritableStream } = require("node:stream/web");
const { setTimeout: timer } = require("node:timers/promises");
const { performance } = require("node:perf_hooks");

// 可读流
const readable = new ReadableStream(
  {
    async pull(controller) {
      await timer(100); // 100ms 读取一次
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

// 可写流 1s钟读取一次
const writeable = new WritableStream({
  async write(chunk, controller) {
    await timer(1000);
    console.log("写入流接收到的数据", chunk);
  },
});

(async () => {
  // 效果：当reader读完满内置队列之后，writer只有写入完成后，reader才会继续读，强制当水平线
  const writer = writeable.getWriter();
  for await (const value of readable) {
    await writer.write(value);
  }
})();
