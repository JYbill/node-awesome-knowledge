/**
 * @file: 3-tcp封包拆包解决粘包问题server.js
 * @author: xiaoqinvar
 * @desc: tcp封包拆包解决粘包问题server
 * @date: 2022-11-02 19:52:36
 */
const net = require("net");
const Transform = require("./2-封包拆包");
const transform = new Transform();

const client = net.createConnection(
  {
    port: "1234",
  },
  () => {
    client.write(transform.encode(Buffer.from("你好👋1")));
    client.write(transform.encode(Buffer.from("你好👋2")));
    client.write(transform.encode(Buffer.from("你好👋3")));
  },
);
client.on("data", () => {});
