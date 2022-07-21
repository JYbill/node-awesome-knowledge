import { Context } from '@midwayjs/koa';
import { UserService } from './../service/user.service';
import { HttpStatus, MidwayHttpError, httpError } from '@midwayjs/core';
import { Controller, Get, Inject, Scope, ScopeEnum } from '@midwayjs/decorator';
import { PhoneError } from '../error/phone.error';
import { getProviderUUId } from '@midwayjs/decorator';
import Application = require('koa');
import { IFactoryService } from '../interface';
import { LifeService } from '../service/life.service';

@Controller('/e')
export class ErrorController {
  @Inject()
  lifeService: LifeService;

  @Get('/life')
  async life() {
    return this.lifeService.name;
  }

  // constructor() {
  //   // console.log('controller scope');
  // }

  // @Inject()
  // userService: UserService;

  // @Inject()
  // ctx: Context;

  // @Get()
  // async index() {
  //   // return new Promise(resolve => {
  //   //   setTimeout(() => {
  //   //     resolve(1);
  //   //   }, 5000);
  //   // });
  //   // console.log(getProviderUUId(UserService)); // 461ec2d7a2508912742e519af8d9f0e4
  //   const ret = await this.ctx.app
  //     .getApplicationContext()
  //     .getAsync<UserService>(UserService, ['xiaoqinvar']);
  //   // const ret = await this.ctx.requestContext.getAsync<UserService>(
  //   //   UserService,
  //   //   ['abc']
  //   // );
  //   return ret;
  //   // return 'ok.';
  //   // throw new PhoneError();
  // }

  // @Inject('factoryService')
  // factoryService;

  // @Get('/factory')
  // async() {
  //   return this.factoryService();
  // }
}
