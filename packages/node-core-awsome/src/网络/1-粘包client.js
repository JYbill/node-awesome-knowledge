/**
 * @file: 1-粘包server.js
 * @author: xiaoqinvar
 * @desc：粘包server
 * @date: 2022-11-01 21:49:21
 */
const net = require("net");
const client = net.connect(
  {
    port: 8080,
  },
  () => {
    console.log("客户端连接成功");
    client.write("world!\n");
  },
);

client.on("data", function (data) {
  // 接受数据时回调
  console.log("接收到服务端消息", data.toString());
  // client.end(); // 中断TCP链接
});

client.on("end", function () {
  // 断开链接时回调
  console.log("客户端主动断开");
});

client.on("error", function (error) {
  // 所有异常回调
  console.log(error);
});
