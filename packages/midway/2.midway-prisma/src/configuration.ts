import { DefaultErrorFilter } from './filters/default.filter';
import { PrismaClientServiceFactory } from './service/prismaServiceFactory';
import { App, Configuration, Inject, Logger } from '@midwayjs/decorator';
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

@Configuration({
  imports: [egg],
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
    this.app.useFilter(DefaultErrorFilter);
  }

  async onStop(): Promise<void> {
    // 关闭prisma 连接
    const prismaClient = this.prismaClientServiceFactory.get();
    await prismaClient.$disconnect();
  }
}
