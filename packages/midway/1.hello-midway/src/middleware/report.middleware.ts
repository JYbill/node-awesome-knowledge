import { IMiddleware } from '@midwayjs/core';
import { Middleware } from '@midwayjs/decorator';
import { NextFunction, Context } from '@midwayjs/koa';

@Middleware()
export class ReportMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      console.log(' ====== 开始执行 ====== ');
      // 控制器前执行的逻辑
      const startTime = Date.now();

      // 执行下一个中间件，最后执行到控制器，这里可以拿到下一个中间件或者控制器的返回值
      const result = await next();

      // 控制器之后执行的逻辑
      console.log(`${ReportMiddleware.getName()}执行结果：`, result);
      console.log(
        ' ====== 结束执行 ====== 耗时：' + (Date.now() - startTime) + 'ms'
      );
      // 返回给上一个中间件的结果
      return result;
    };
  }

  // 这里的静态 getName 方法，用来指定中间件的名字，方便排查问题。
  static getName(): string {
    return 'report';
  }
}
