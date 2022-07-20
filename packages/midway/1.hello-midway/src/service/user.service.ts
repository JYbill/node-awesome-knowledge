import { Context } from '@midwayjs/koa';
import { Inject, Provide, Scope, ScopeEnum } from '@midwayjs/decorator';
import { IUserOptions } from '../interface';

@Provide()
@Scope(ScopeEnum.Singleton)
export class UserService {
  count: number = 0;

  constructor() {
    console.log('init.');
  }

  @Inject()
  ctx: Context;

  async getUser(options: IUserOptions) {
    return {
      uid: options.uid,
      username: 'mockedName',
      phone: '12345678901',
      email: 'xxx.xxx@xxx.com',
    };
  }

  async getCount() {
    console.log(this.ctx);
    return this.count++;
  }
}
