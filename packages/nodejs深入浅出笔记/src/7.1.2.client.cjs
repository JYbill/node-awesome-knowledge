/**
 * @file: 7.1.2.client.cjs
 * @author: xiaoqinvar
 * @desc：tcp客户端
 * @date: 2022-06-07 09:46:19
 */
const net = require('net');
const client = net.connect({
    port: 8134,
    // path: '/xqv.socket'
  },
  () => {
    console.log('client connected');
    client.write('world!\r\n');
  });

client.on('data', function(data) {
  console.log(data.toString());
  // client.end();
});

client.on('end', function() {
  console.log('client disconnected');
});

client.on('error', function(error) {
  console.log(error);
});