// require和import区别
console.log(1);
import export1 from './2.2.3.export.mjs'; // 存在import提升
import export2 from './2.2.3.export.mjs';
console.log(2);
console.log(export1 === export2);
export1.name = 'abc'; // 修改的是缓存的，再次引入的都会从缓存加载，所以结果一致
console.log(export1, export2);
// 异步加载
import('./2.2.3.export.mjs').then((res) => {
  console.log(res.default);
})