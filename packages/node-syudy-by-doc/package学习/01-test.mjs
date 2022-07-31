import { myself } from 'pkg';
// 等价于
// import { myself } from 'pkg/api';

// 通配符测试
import { yourself } from 'pkg/v2/api.v2';

// exports字段不是强封装，完整路径任然可以拿到
import { name } from 'pkg';

// import { privateObj } from 'pkg/private/index.mjs'; // ERR_PACKAGE_PATH_NOT_EXPORTED

// 自引入
import { self } from 'packages';

console.log(myself);
console.log(yourself);
console.log(name);
// console.log(privateObj); // 抛出ERR_PACKAGE_PATH_NOT_EXPORTED
console.log(self);

// 双模块
import m from 'pkg/m';
console.log(m);