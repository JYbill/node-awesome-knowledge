import { MidwayHttpError, HttpStatus } from '@midwayjs/core';

export class PhoneError extends MidwayHttpError {
  constructor() {
    super('错误手机号错误(演示)', HttpStatus.BAD_REQUEST);
  }
}
