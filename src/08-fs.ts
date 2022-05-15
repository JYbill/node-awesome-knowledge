/**
 * @file: 08-fs.ts
 * @author: xiaoqinvar
 * @desc：fs模块相关内容
 * @date: 2022-05-15 19:37:35
 */
import fs from 'fs';
import { join, resolve } from 'path';

/**
 * readFile
 */
/* fs.readFile(join(__dirname, '../assets/test.txt'), 'utf-8', (err, data) => {
  if (err) {
    throw err;
  }
  console.log(data.toString());
}) */

/**
 * writeFile
 */
/* fs.writeFile(resolve('assets/test.txt'), '大家好', {
  mode: 0o666,
  flag: 'w+'
}, (err) => {
  if (err) {
    throw err;
  }
  console.log('写入成功');
}) */

/**
 * appendFile
 */
/* fs.appendFile(resolve('assets/test.txt'), 'appendFile', (error) => {
  if (error) { throw error; }
  console.log('追加成功');
}) */

/**
 * copyFile
 */
/* fs.copyFile(resolve('assets/test.txt'), resolve('assets/copy.txt'), (error) => {
  console.log(error);
}) */

/**
 * watchFile
 */
/* fs.watchFile(resolve('assets/test.txt'), (curr, prev) => {
  console.log(curr);
  fs.unwatchFile(resolve('assets/test.txt'));
}); */
