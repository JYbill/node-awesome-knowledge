/**
 * @file: 7.1.2.tcp.js
 * @author: xiaoqinvar
 * @desc：tcp服务器
 * @date: 2022-05-31 17:56:13
 */
const net = require('net');

const server = net.createServer((socket) => {
  // 新链接
  socket.on('data', function(data) {
    socket.write("你好");
  });


  // 连接断开
  socket.on('end', function() {
    console.log('连接断开');
  });
  socket.write("欢迎光临《深入浅出Node.js》示例：\n");
  socket.pipe(socket);
});

server.listen({
  port: 8134,
  // path: '/xqv.socket'
}, () => {
  console.log('8124 tcp server is running');
});