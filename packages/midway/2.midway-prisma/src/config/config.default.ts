import { MidwayConfig, MidwayAppInfo } from '@midwayjs/core';

export default (appInfo: MidwayAppInfo) => {
  return {
    keys: appInfo.name + '_1659422886988_3248',

    // egg
    egg: {
      port: 7003,
    },

    // prisma
    prismaConfig: {
      default: {
        log: ['query', 'info'],
      },
      client: {},
    },

    // 日志
    midwayLogger: {
      clients: {
        coreLogger: {
          level: 'info',
          consoleLevel: 'info',
        },
        appLogger: {
          level: 'info',
          consoleLevel: 'info',
        },
      },
    },
  } as MidwayConfig;
};
