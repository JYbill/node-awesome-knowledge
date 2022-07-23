import { MidwayAppInfo, MidwayConfig } from '@midwayjs/core';

// 对象形式
export default {
  koa: {
    port: null,
  },
  test: 'xiaoqinvar',
} as MidwayConfig;

// 函数形式
// export default (appInfo: MidwayAppInfo): MidwayConfig => {
//   return {

//   }
// }
