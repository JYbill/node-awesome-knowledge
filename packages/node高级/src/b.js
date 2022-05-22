/* 
// ES module导入commonJS文件 ✅
module.exports = {
  username: 'xiaoqinvar'
} 
*/
/* 
// 报错：Must use import to load ES Module❌
const a = require('./a.mjs');
console.log(a); 
*/

setTimeout(async () => {
  // 模块化只能用一个
  // const fs = require('fs'); // 运行时加载
  const { Dir } = await import('fs'); // 运行时加载
  console.log(fs.Dir === Dir, Dir);
}, 0);
console.log(1);