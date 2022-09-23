import { NotFoundFilter } from './filters/notFound.filter';
import { DefaultErrorFilter } from './filters/default.filter';
import { PrismaClientServiceFactory } from './service/prismaServiceFactory';
import { App, Configuration, Inject, Logger } from '@midwayjs/decorator';
import * as staticFile from '@midwayjs/static-file';
import * as socketIO from '@midwayjs/socketio';
import {
  Context,
  ILifeCycle,
  ILogger,
  IMidwayBaseApplication,
  IMidwayContainer,
} from '@midwayjs/core';
import { Application } from 'egg';
import { join } from 'path';
import * as egg from '@midwayjs/web';
import { MidwayHttpErrorFilter } from './filters/midway.filter';

@Configuration({
  imports: [egg, staticFile, socketIO],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: Application;

  @Inject()
  prismaClientServiceFactory: PrismaClientServiceFactory;

  @Inject()
  logger: ILogger;

  async onReady() {
    this.app.useFilter([
      DefaultErrorFilter,
      MidwayHttpErrorFilter,
      NotFoundFilter,
    ]);
  }

  async onStop(): Promise<void> {
    // 关闭prisma 连接
    const prismaClient = this.prismaClientServiceFactory.get();
    await prismaClient.$disconnect();
    // test verify1
  }
}
