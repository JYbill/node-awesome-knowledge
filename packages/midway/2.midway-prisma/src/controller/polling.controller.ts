import { ILogger } from '@midwayjs/core';
import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  Post,
} from '@midwayjs/decorator';
import { Context } from '@midwayjs/web';
import { UserService } from '../service/prisma.service';

@Controller('polling')
export default class UserController {
  @Logger()
  logger: ILogger;

  @Inject()
  ctx: Context;

  /**
   * HTTP长轮询
   * @returns
   */
  @Get()
  async index() {
    const random = Math.floor(Math.random() * 10);
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.logger.info(random);
        if (random >= 6) {
          return resolve(new Date());
        }
        clearTimeout(timer);
        resolve(this.index());
      }, 3000);
    });
  }
}
