import { UserWithPosts } from './../type';
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
    return all;
  }

  /**
   * 获取所有用户数据包括1:n邮箱表
   * @returns
   */
  async findAllWithEmail() {
    return this.prismaClient.user.findMany({
      include: {
        emails: {
          // select: { id: false },
        },
        roles: {
          select: { name: true },
        },
      },
    });
  }

  /**
   * 创建用户且携带邮箱
   * @param userWithEmail
   * @returns
   */
  async createUserAndEmail(userWithEmail: UserWithPosts) {
    return this.prismaClient.user.create({
      data: {
        age: userWithEmail.age,
        name: userWithEmail.name,
        roles: {
          connect: userWithEmail.roles,
        },
        emails: {
          create: userWithEmail.emails,
        },
      },
    });
  }
}
