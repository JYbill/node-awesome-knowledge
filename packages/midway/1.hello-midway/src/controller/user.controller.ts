import { Context } from '@midwayjs/koa';
import {
  Body,
  Controller,
  Get,
  Headers,
  Inject,
  Param,
  Post,
  Query,
  RequestIP,
  RequestPath,
} from '@midwayjs/decorator';

@Controller('/user')
export class UserController {
  @Inject()
  ctx: Context;

  @Get('/')
  async index(@Query('id') query) {
    console.log('id', query);
    return 'fine';
  }

  @Get('/query2')
  async query2(@Query() query) {
    console.log('obj', query);
    return {};
  }

  @Get('/query3')
  async query3() {
    console.log(this.ctx.query.id);
    // {id: ['1', '2']}
    return this.ctx.query;
  }

  @Post('/p1')
  async post1(@Body() body) {
    // body 等价于 ctx.request.body
    console.log(this.ctx.request.body === body); // true
    return body;
  }

  @Get('/:id')
  async param1(@Param('id') id: string) {
    return id;
  }

  @Get('/header')
  async header(@Headers('cache') cache: string) {
    console.log(this.ctx.get('cache') === cache);
    return cache;
  }

  @Get('/cookie')
  async myCookie() {
    this.ctx.cookies.set('foo', 'bar');
  }

  @Get('/cookie2')
  async cookie2() {
    console.log(this.ctx.cookies.get('foo'));
  }

  @Get('/session')
  async session() {
    const session = this.ctx.session;
    session.count = session.count ? session.count + 1 : 1;
    return session;
  }

  @Get('/other')
  async other(@RequestIP() ip, @RequestPath() path) {
    return {
      ip,
      path,
    };
  }

  @Get('/transform')
  async transform(
    @Query('bool') bool: boolean,
    @Query('number') number: number
  ) {
    const bool1 = this.ctx.query['bool'];
    console.log(bool1);
    console.log(bool1.length);
    console.log(Boolean(bool1));
    console.log(typeof bool1);
    console.log(typeof bool, typeof number);
    return {
      bool,
      number,
    };
  }
}
