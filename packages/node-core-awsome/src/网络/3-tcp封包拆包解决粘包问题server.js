/**
 * @file: 3-tcp封包拆包解决粘包问题client.js
 * @author: xiaoqinvar
 * @desc: tcp封包拆包解决粘包问题client
 * @date: 2022-11-02 19:52:29
 */
const net = require("net");
const Transform = require("./2-封包拆包");
const transform = new Transform();

const server = net.createServer((socket) => {
  let cacheBuf = null; // tcp缓存buffer

  socket.on("data", (chunk) => {
    // 初始化缓存
    if (transform.getBufferLen(cacheBuf) <= 0) {
      cacheBuf = chunk;
    }

    // 循环拆包
    while (transform.getBufferLen(cacheBuf) > 0) {
      const decodeData = transform.decode(cacheBuf);
      const serial = decodeData.serial;
      const payload = decodeData.payload;
      const payloadLen = decodeData.payloadLen;
      console.log("接收到客户端版本", serial, "接收到客户端消息：", payload.toString());
      cacheBuf = cacheBuf.slice(transform.headerLen + payloadLen);
    }
  });
});

server.listen(1234, () => {
  console.log("http://locahost:1234 is running");
});
