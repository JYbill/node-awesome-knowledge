import { ILogger } from '@midwayjs/core';
import {
  Body,
  Controller,
  Get,
  Head,
  Headers,
  Inject,
  Logger,
  Post,
  SetHeader,
} from '@midwayjs/decorator';
import { Context } from '@midwayjs/web';
import { WriteStream } from 'fs';
import { Duplex, PassThrough, Stream, Writable } from 'stream';
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

  count = 0;
  /**
   * http-stream 长连接
   */
  @Get('/stream')
  @SetHeader('content-type', 'multipart/octet-stream')
  async httpStream() {
    this.logger.info(this.count);
    this.count++;
    return new Promise(resolve => {
      setTimeout(async () => {
        this.ctx.res.write(Buffer.from(Math.random().toString()));
        if (this.count === 3) {
          resolve('FIN');
          return;
        }
        await this.httpStream();
        resolve('FIN');
      }, 2000);
    });
  }

  @Get('/see')
  @SetHeader('Content-Type', 'text/event-stream')
  @SetHeader('Connection', 'keep-alive')
  @SetHeader('Cache-Control', 'no-cache')
  async event() {
    const pass = new PassThrough();
    setInterval(() => {
      pass.write('id: ' + Math.floor(Math.random() * 10) + '\n');
      pass.write('data: ' + new Date().toLocaleString() + '\n\n');
    }, 2000);
    return pass;
  }
}
