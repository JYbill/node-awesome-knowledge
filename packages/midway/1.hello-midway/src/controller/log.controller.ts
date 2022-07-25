import { MidwayHttpError, HttpStatus } from '@midwayjs/core';
import { Controller, Get, Inject, Logger } from '@midwayjs/decorator';
import { ILogger } from '@midwayjs/logger';

/**
 * @file: log.controller.ts
 * @author: xiaoqinvar
 * @desc：
 * @date: 2022-07-24 15:39:18
 */
@Controller('log')
export class LogController {
  @Inject()
  logger: ILogger;

  @Logger()
  appLogger: ILogger;

  @Get()
  async index() {
    this.logger.info('test log.');
    this.logger.debug('test debug.');
    this.logger.warn('test warn.');
    // 为了保证异常可追踪，必须保证所有抛出的异常都是 Error 类型，因为只有 Error 类型才会带上堆栈信息，定位到问题。
    // this.logger.error(
    //   new MidwayHttpError('custom error', HttpStatus.BAD_REQUEST)
    // );
    return 'ok.';
  }

  @Get('/app')
  async appLoggerFunc() {
    this.appLogger.info('info app logger.');
    this.appLogger.debug('app logger.');
    this.appLogger.warn('warn app logger.');
    // this.appLogger.error('error app logger.');
    // this.logger.error(
    //   new MidwayHttpError('custom error', HttpStatus.BAD_REQUEST)
    // );
    return 'app logger.';
  }

  @Get('/format')
  async format() {
    const map = new Map();
    map.set('k', 'v');
    const set = new Set([1, 2, 1]);
    this.logger.info(map);
    this.logger.info(set);
    return 'format.';
  }
}
