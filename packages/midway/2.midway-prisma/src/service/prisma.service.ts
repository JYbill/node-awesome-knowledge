import { PrismaClient } from '@prisma/client';
import { PrismaClientServiceFactory } from './prismaServiceFactory';
import {
  Config,
  Init,
  Inject,
  Provide,
  Scope,
  ScopeEnum,
} from '@midwayjs/decorator';
import { MidwayHttpError, HttpStatus } from '@midwayjs/core';

@Provide()
@Scope(ScopeEnum.Singleton)
export class UserService {
  @Inject()
  prismaClientFactory: PrismaClientServiceFactory;

  prismaClient: PrismaClient;

  @Init()
  async init() {
    this.prismaClient = this.prismaClientFactory.get();
  }

  /**
   * 获取所有user表的数据
   * @returns
   */
  async findAll() {
    const all = await this.prismaClient.user.findMany();
    throw new MidwayHttpError('bad', HttpStatus.BAD_REQUEST);
    return all;
  }
}
