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