/**
 * @file: 7.3.3.http.client.js
 * @author: xiaoqinvar
 * @desc：http client
 * @date: 2022-07-06 14:26:30
 */
const http = require('http');
const req = http.request(
  {
    hostname: 'www.baidu.com',
    port: 80,
    path: '/',
    method: 'GET',
  },
  (res) => {
    res.setEncoding('utf8');
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));

    res.on('data', (buffer) => {
      console.log(buffer);
    });
  }
);
req.end();
