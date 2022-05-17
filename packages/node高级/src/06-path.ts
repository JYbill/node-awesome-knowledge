/**
 * @file: 06-path.ts
 * @author: xiaoqinvar
 * @desc：path核心模块相关
 * @date: 2022-05-05 18:32:03
 */
import path from 'path';

console.log(__filename);

/**
 * basename
 */
// console.log(path.basename(__filename, ".ts")); // 06-path

/**
 * dirname
 */
// console.log(path.dirname(__filename)); // 文件之前的完整路径

/**
 * extname
 */
// console.log(path.extname(__filename)); // .ts


/**
 * 解析路径
 */
// console.log(path.parse(__filename));
/*
{
  root: '/', // 跟路径
  dir: '/Users/xiaoqinvar/Desktop/practice/node高级/src', // 目录
  base: '06-path.ts', // 完整文件名
  ext: '.ts', // 文件扩展
  name: '06-path' // 文件名
}
*/

/**
 * 序列化路径
 */
// const parse = path.parse(__filename);
// console.log(path.format(parse));

/**
 * 是否是绝对路径
 */
// console.log(path.isAbsolute(__filename)); // true

/**
 * join路径拼接
 */
// console.log(path.join('/', 'c', '..', 'a')); // /a

/**
 * 路径格式化
 */
// console.log(path.normalize('a///b/../c/d')); // a/c/d

/**
 * 路径处理
 */
console.log(path.resolve('a', 'b')); // pwd/a/b
console.log(path.resolve('a', '..', 'b')); // pwd/b
console.log(path.resolve('/a', '..', 'b')); // /b
console.log(path.resolve('a', '/b')); // /b
