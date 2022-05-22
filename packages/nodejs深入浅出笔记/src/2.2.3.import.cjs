// exports细节
// const fileExport = require('./2.2.3.export.cjs');
// console.log(fileExport);

// 运行时加载且同步
console.log(1);
const fileExport1 = require('./2.2.3.export.cjs');
const fileExport2 = require('./2.2.3.export.cjs');
console.log(2);
console.log(fileExport1 === fileExport2);
fileExport1.user.name = 'abc';
console.log(fileExport1, fileExport2);