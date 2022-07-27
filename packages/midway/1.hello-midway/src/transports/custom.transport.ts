import { Provide, Scope, ScopeEnum } from '@midwayjs/decorator';
import { EmptyTransport } from '@midwayjs/logger';

@Provide()
@Scope(ScopeEnum.Singleton)
export default class CustomTransport extends EmptyTransport {
  log(info, callback) {
    // 使用ctx
    if (info.ctx) {
      // ...
    } else {
      // ...
    }
    console.log(info.message);
    callback();
  }
}
