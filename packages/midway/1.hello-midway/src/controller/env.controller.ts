import { MidwayEnvironmentService } from '@midwayjs/core';
import { ALL, App, Config, Controller, Get, Inject } from '@midwayjs/decorator';
import { Application, Context } from '@midwayjs/koa';

/**
 * @file: env.controller.ts
 * @author: xiaoqinvar
 * @desc：获取当前环境控制器
 * @date: 2022-07-22 10:55:13
 */
@Controller('/env')
export class EnvController {
  @Inject()
  ctx: Context;

  @App()
  app: Application;

  @Inject()
  envService: MidwayEnvironmentService;

  @Config()
  keys;

  @Config(ALL)
  all;

  @Config('target')
  target;

  test;

  @Get()
  async index() {
    // console.log(this.app.getEnv());
    // console.log(this.envService.getCurrentEnvironment());
    // console.log(this.keys);
    // console.log(this.all);
    return 'ok.';
  }
}
