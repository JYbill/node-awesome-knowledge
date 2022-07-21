import { Context } from '@midwayjs/koa';
import {
  Destroy,
  Init,
  Inject,
  Provide,
  Scope,
  ScopeEnum,
} from '@midwayjs/decorator';
import { IUserOptions } from '../interface';

@Provide()
@Scope(ScopeEnum.Request)
export class UserService {
  count: number = 0;

  constructor(private readonly studentName) {
    // console.log('init.');
  }

  @Inject()
  ctx: Context;

  @Init()
  async init() {
    console.log('im init.');
  }

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

  @Destroy()
  async stop() {
    console.log('before die.');
  }
}
