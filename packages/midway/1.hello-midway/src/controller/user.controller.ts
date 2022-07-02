import { ReportMiddleware } from './../middleware/report.middleware';
import { createReadStream } from 'fs';
import { Context } from '@midwayjs/koa';
import {
  Body,
  ContentType,
  Controller,
  Get,
  Headers,
  HttpCode,
  Inject,
  Param,
  Post,
  Query,
  // Redirect,
  RequestIP,
  RequestPath,
  // SetHeader,
} from '@midwayjs/decorator';
import UserDTO from '../dto/user.dto';
import { User } from '../interface';
import { join } from 'path';

// @Controller('/user', { middleware: [ReportMiddleware] })
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

  @Post('/complex')
  async complex(@Body() user: UserDTO) {
    console.log(user);
    console.log(user instanceof UserDTO);
    return user;
  }

  @Post('/interface')
  async interface(@Body() user: User) {
    console.log(user);
    return user;
  }

  @Get('/res')
  // @SetHeader('content-type', 'image/png')
  @ContentType('image/png')
  async res() {
    // content-type	text/plain; charset=utf-8
    // return 'text';

    // content-type	application/json; charset=utf-8
    // return { a: 1, b: '2', c: true };

    // content-type	text/html; charset=utf-8
    // return `<h1 style="color: orange">一级标题</h1>`;

    // content-type	application/octet-stream
    const path = join(__dirname, '../assets/deno.png');
    // const path = join(__dirname, '../assets/index.html');
    return createReadStream(path);
  }

  @Get('/status')
  @HttpCode(201)
  async status() {
    return 'ok.';
  }

  @Get('/redirect')
  // @Get('/redirect', { ignoreGlobalPrefix: true })
  // @Redirect('/user/status', 302)
  // @Redirect('status', 302)
  async redirect() {
    console.log('redirect');
    return 'ok.';
  }

  @Get('/log')
  async log() {
    const logger = this.ctx.logger;
    logger.info('ok.');
    logger.info(this.ctx.startTime);
    const getLogger = this.ctx.getLogger('custom');
    logger.info(getLogger);
    return 'ok.';
  }
}
