const user = {
  name: 'xiaoqinvar'
}
console.log('cjs加载...', module.loaded);
// module.exports = user; // { name: 'xiaoqinvar' }
// exports = user; // {}
// exports.user = user; // // { name: 'xiaoqinvar' }
setTimeout(() => {
  console.log('cjs 10s导出内容...', module.exports); // 导出提升，但是没有导出值！
  exports.user = user; // 此时才导出值
  console.log('cjs 10s导出内容...', module.exports); // 此时才有
}, 10);