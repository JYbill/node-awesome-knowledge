import { ILogger } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { Controller, Get, Inject } from '@midwayjs/decorator';

@Controller('aop')
export default class AopController {
  @Inject()
  ctx: Context;

  @Inject()
  logger: ILogger;

  @Get()
  async index() {
    return 'ok.';
  }

  @Get('/custom')
  async customContext() {
    this.logger.info(this.ctx.abc);
    return 'custom.';
  }
}
