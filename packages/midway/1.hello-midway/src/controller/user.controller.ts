import { Context } from '@midwayjs/koa';
  import { Body, Controller, Get, Inject, Post, Query } from '@midwayjs/decorator';

  @Controller('/user')
  export class UserController {

    @Inject()
    ctx: Context

    @Get('/')
    async index(@Query('id') query) {
      console.log('id', query);
      return {
        
      };
    }

    @Get('/query2')
    async query2(@Query() query) {
      console.log('obj', query);
      return {
        
      };
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
  }
