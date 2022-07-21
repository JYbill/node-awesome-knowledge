import { providerWrapper, IMidwayContainer } from '@midwayjs/core';
import { Provide, Scope, ScopeEnum } from '@midwayjs/decorator';

/**
 * @file: factory.service.ts
 * @author: xiaoqinvar
 * @desc：工厂函数 注入
 * @date: 2022-07-21 15:26:46
 */
export async function factoryServiceHandler(container: IMidwayContainer) {
  return async env => {
    if (env === 'dev') {
      return { name: 'xiaoqinvar.' };
    }
    return { name: 'jybill.' };
  };
}

providerWrapper([
  {
    id: 'factoryService',
    provider: factoryServiceHandler,
    scope: ScopeEnum.Request,
  },
]);
