/**
 * @file: 21.stream.js
 * @author: xiaoqinvar
 * @desc：stream 流
 * @date: 2022-06-21 20:40:16
 */
const fs = require('fs');
const rs = fs.createReadStream('../assets/copy.txt');
const ws = fs.createWriteStream('../assets/copy1.txt');
rs.pipe(ws);
rs.pipe(process.stdout);
