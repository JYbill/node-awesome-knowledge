import { PrismaClient } from '@prisma/client';
import { PrismaClientServiceFactory } from './prismaServiceFactory';
import { Config, Init, Inject, Provide } from '@midwayjs/decorator';

@Provide()
export default class UserService {
  @Inject()
  prismaClientFactory: PrismaClientServiceFactory;

  prismaClient: PrismaClient;

  @Init()
  async init() {
    this.prismaClient = this.prismaClientFactory.get();
    console.log('service init', this.prismaClient);
    // this.prismaClient = (await this.prismaClientFactory.createInstance(
    //   null
    // )) as PrismaClient;
  }

  async findAll() {
    // await this.prismaClient.$connect();
    const all = await this.prismaClient.user.findMany();
    console.log(all);
    return null;
  }
}
