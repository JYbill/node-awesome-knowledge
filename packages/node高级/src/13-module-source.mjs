/**
 * @file: 13-module-source.ts
 * @author: xiaoqinvar
 * @desc：模块化导入源码调试
 * @date: 2022-05-29 12:24:01
 */
import('./13-module-export.mjs')
  .then((res) => {
    console.log(res);
  });
/* const obj = require('./13-module-export.mjs');
console.log(obj); */