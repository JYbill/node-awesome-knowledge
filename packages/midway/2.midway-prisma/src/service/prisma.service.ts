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
    return all;
  }
}
