import { ILogger, IMiddleware } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import {
  Body,
  Controller,
  FORMAT,
  Get,
  Inject,
  Logger,
  Query,
} from '@midwayjs/decorator';

@Controller('cookie')
export default class CookieController {
  @Inject()
  ctx: Context;

  @Logger()
  logger: ILogger;

  @Get()
  async index() {
    this.ctx.cookies.set('app', 'xqv.', {
      signed: false,
    });
    // this.ctx.cookies.set('age', '23');
    const foo = this.ctx.cookies.get('app', {
      signed: false,
    });
    this.logger.info(foo);
    this.logger.info(
      this.ctx.cookies.get('foo', {
        signed: true,
      })
    );
    // this.logger.info(this.ctx.cookies.get('age'));
    // console.log(this.ctx.header['cookie'].split(';'));
    return 'index.';
  }

  @Get('/visit')
  async visit(@Query() data) {
    /* if (this.ctx.session.user) {
      this.logger.info(`before:`);
      this.logger.info(this.ctx.session.user);

      const user = this.ctx.session.user;
      user.count += 1;
      this.ctx.session.user = user;

      this.logger.info(`after:`);
      this.logger.info(user);
      // this.logger.info('having session.');
      // this.logger.info(this.ctx.session.user);
      this.ctx.session.maxAge = FORMAT.MS.ONE_DAY * 30;
      return this.ctx.session.user;
    }
    data.count = 1;
    this.ctx.session.user = data;
    this.logger.info('setting session.');
    this.logger.info(this.ctx.session.user);
    return this.ctx.session.user; */
    const ctx = this.ctx;
    ctx.session.visited = ctx.session.visited ? ctx.session.visited + 1 : 1;
    return ctx.session;
  }

  @Get('/mock')
  async mock() {
    this.logger.info(this.ctx['uname']);
    return 'mock.';
  }
}
