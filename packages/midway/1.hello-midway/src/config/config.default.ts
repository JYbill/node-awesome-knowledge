import { MidwayConfig } from '@midwayjs/core';
import { info } from 'console';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1655889130481_8972',
  koa: {
    port: 3001,
    // contextLoggerFormat: (info) => {
    //   const ctx = info.ctx;
    //   return `${ctx.method} ${info.message}`;
    // },
  },
  midwayLogger: {
    clients: {
      appLogger: {
        level: 'warn', // 写入日志文件必须 >= warn等级(warn、error)
        consoleLevel: 'info', // 输出在控制太 >= debug(debug、info、warn、error)
      },
      xiaoqinvarLogger: {
        consoleLevel: 'DEBUG',
        fileLogName: 'xiaoqinvar.log',
        level: 'DEBUG',
        enableConsole: true, // 开启控制台输出
        enableFile: true, // 开启文件写入
        enableJSON: false, // 写入json格式的日志文件
        format: (info) => {
          return `xqv say: ${info.message}`;
        },
      },
    },
  },
  session: {
    maxAge: 24 * 3600 * 1000, // 1天
    key: 'XQV_SESS',
    httpOnly: true,
    renew: true,
  },
} as MidwayConfig;
