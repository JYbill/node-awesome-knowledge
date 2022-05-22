// require和import区别
console.log(1);
import export1 from './2.2.3.export.mjs'; // 存在import提升
import export2 from './2.2.3.export.mjs';
console.log(2);
console.log(export1 === export2);
export1.name = 'abc';
console.log(export1, export2);