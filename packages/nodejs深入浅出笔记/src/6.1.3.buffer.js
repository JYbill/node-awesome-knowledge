/**
 * @file: 6.1.3.buffer.js
 * @author: xiaoqinvar
 * @desc：buffer slab 大小即区分大内存对象和小内存对象的临界值大小，而不是buffer池大小
 * @date: 2022-05-31 17:56:31
 */
Buffer.poolSize = 1024; // 超过1KB大内存，小于等于1KB小内存
console.log('buffer 池大小', Buffer.poolSize / 1024 + 'KB');