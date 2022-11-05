const { buffer: arrayBuffer } = require("node:stream/consumers");
const { setTimeout: timer } = require("node:timers/promises");
const { createReadStream } = require("node:fs");
const { resolve } = require("node:path");

const tfs = new TransformStream(
  {
    transform(chunk, controller) {
      controller.enqueue(chunk + ".");
    },
  },
  {
    highWaterMark: 5,
    size(chunk) {
      return 1;
    },
  },
  {
    highWaterMark: 5,
    size(chunk) {
      return 1;
    },
  },
);

(async () => {
  const writer = tfs.writable.getWriter();
  const readableStream = tfs.readable;
  await writer.write(1);
  await writer.write(2);
  await writer.write(3);

  // Transform cloud be read. ✅
  // const reader = tfs.readable.getReader();
  // console.log(await reader.read());
  // console.log(await reader.read());
  // console.log(await reader.read());
  // reader.releaseLock();

  // ❌ cannot be consumers(did not work)
  const dataAsync = arrayBuffer(readableStream);
  console.log("check", dataAsync);
  const data = await dataAsync;
  console.log("from readable: ", data);

  // Stream.readable ✅
  // const fileReadable = createReadStream(resolve(__dirname, "assets/test.txt"));
  // const dataAsync = arrayBuffer(fileReadable);
  // console.log("check", dataAsync);
  // const data = await dataAsync;
  // console.log("from readable: ", data);
})();
