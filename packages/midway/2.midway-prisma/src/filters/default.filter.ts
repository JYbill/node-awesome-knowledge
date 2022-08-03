import { Catch } from '@midwayjs/decorator';
import { Context } from 'egg';

@Catch()
export class DefaultErrorFilter {
  async catch(err: Error, ctx: Context) {
    return {
      code: 400,
      success: false,
      message: err.message,
    };
  }
}
