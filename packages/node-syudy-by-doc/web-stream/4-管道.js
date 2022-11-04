/**
 * @file: 4-管道.js
 * @author: xiaoqinvar
 * @desc: 管道
 * @date: 2022-11-04 16:29:33
 */
const { TransformStream } = require("node:stream/web");

const transform = new TransformStream(
  {
    // 可写流写入出发转换过程
    transform(chunk, controller) {
      controller.enqueue(chunk.toUpperCase());
    },

    // 写入流关闭执行
    flush(controller) {
      console.log("写入流关闭！");
    },
  },
  // 可写流阈值配置
  {
    highWaterMark: 5,
    size() {
      return 1;
    },
  },
  // 可读流阈值配置
  {
    highWaterMark: 5,
    size() {
      return 1;
    },
  },
);

(async () => {
  const writer = transform.writable.getWriter();
  const reader = transform.readable.getReader();
  await writer.write("abc");
  const value = await reader.read();
  console.log(value);
  writer.close();
})();
