import { resolve } from 'path';
import { Context } from '@midwayjs/koa';
import {
  Destroy,
  Init,
  Inject,
  Provide,
  Scope,
  ScopeEnum,
} from '@midwayjs/decorator';

@Provide()
@Scope(ScopeEnum.Singleton)
export class LifeService {
  readonly name = 'xiaoqinvar';

  @Inject()
  ctx: Context;

  @Init()
  async init() {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log('init.');
        resolve('init.');
      }, 500);
    });
  }

  @Destroy()
  async stop() {
    return await new Promise(resolve => {
      setTimeout(() => {
        console.log('die.');
        resolve('die.');
      }, 500);
    });
  }
}
