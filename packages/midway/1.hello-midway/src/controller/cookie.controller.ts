import { ILogger, IMiddleware } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { Controller, Get, Inject, Logger } from '@midwayjs/decorator';

@Controller('cookie')
export default class CookieController {
  @Inject()
  ctx: Context;

  @Logger()
  logger: ILogger;

  @Get()
  async index() {
    this.ctx.cookies.set('app', 'xqv.');
    this.ctx.cookies.set('age', '23');
    const foo = this.ctx.cookies.get('app');
    this.logger.info(foo);
    this.logger.info(this.ctx.cookies.get('age'));
    console.log(this.ctx.header['cookie'].split(';'));
    return 'index.';
  }
}
