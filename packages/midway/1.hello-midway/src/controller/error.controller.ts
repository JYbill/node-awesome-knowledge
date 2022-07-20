import { UserService } from './../service/user.service';
import { HttpStatus, MidwayHttpError, httpError } from '@midwayjs/core';
import { Controller, Get, Inject, Scope, ScopeEnum } from '@midwayjs/decorator';
import { PhoneError } from '../error/phone.error';
import { getProviderUUId } from '@midwayjs/decorator';

@Controller('/e')
export class UserController {
  constructor() {
    console.log('controller scope');
  }

  @Inject()
  userService: UserService;

  @Get()
  async index() {
    // return new Promise(resolve => {
    //   setTimeout(() => {
    //     resolve(1);
    //   }, 5000);
    // });
    // console.log(getProviderUUId(UserService)); // 461ec2d7a2508912742e519af8d9f0e4

    return this.userService.getCount();
    // return 'ok.';
    // throw new PhoneError();
  }
}
