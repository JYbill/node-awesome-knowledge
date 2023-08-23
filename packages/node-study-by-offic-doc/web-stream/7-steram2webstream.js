const { Readable } = require("node:stream");
const { createReadStream } = require("node:fs");
const { buffer: arrayBuffer } = require("node:stream/consumers");
const { resolve } = require("node:path");
const { TransformStream, ReadableStream } = require("node:stream/web");

const tfs = new TransformStream(
  {
    transform(chunk, controller) {
      controller.enqueue(chunk + ".");
    },
  },
  {
    highWaterMark: 5,
  },
  {
    highWaterMark: 5,
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
  const streamReadable = Readable.from(readableStream);
  // streamReadable.on("data", (chunk) => {
  //   console.log("chunk", chunk);
  // });
  console.log("readable", streamReadable instanceof Readable); // readable true
  const dataAsync = arrayBuffer(streamReadable);
  console.log("check", dataAsync);
  try {
    const data = await dataAsync; // BAD
    console.log("from readable: ", data);
    console.log(1);
  } catch (error) {
    console.log(error);
  }

  // Stream.readable ✅
  // const fileReadable = createReadStream(resolve(__dirname, "assets/test.txt"));
  // const dataAsync = arrayBuffer(fileReadable);
  // console.log("check", dataAsync);
  // const data = await dataAsync;
  // console.log("from readable: ", data);
})();
