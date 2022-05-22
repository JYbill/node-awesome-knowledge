const user = {
  name: 'xiaoqinvar'
}
console.log('cjs加载...');

// module.exports = user; // { name: 'xiaoqinvar' }
// exports = user; // {}
exports.user = user; // // { name: 'xiaoqinvar' }