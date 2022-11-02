/**
 * @file: 2-粘包client.js
 * @author: xiaoqinvar
 * @desc：粘包client
 * @date: 2022-11-01 21:50:22
 */
const net = require("net");
const server = net.createServer((socket) => {
  socket.on("connect", () => {
    console.log("有TCP连接进入");
  });

  socket.on("data", function (data) {
    console.log("接受到客户端消息：" + data.toString());
    socket.write("你好1");
    socket.write("你好2");
    socket.write("你好3");
    socket.write("你好4");
    setTimeout(() => {
      socket.write("你好5");
    });
  });

  // 连接断开
  socket.on("end", function () {
    console.log("客户端连接断开");
  });
});

server.listen(
  {
    port: 8080,
    // path: '/xqv.socket'
  },
  () => {
    console.log("8124 tcp server is running");
  },
);
