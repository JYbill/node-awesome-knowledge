const vm = require('vm');

// 可以使用全局变量
age = 10;
vm.runInThisContext('let age = 0; age += 10');
console.log(age);