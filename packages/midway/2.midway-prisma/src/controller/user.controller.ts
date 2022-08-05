import { ILogger } from '@midwayjs/core';
import { UserWithPosts } from './../type';
import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  Post,
} from '@midwayjs/decorator';
import { UserService } from '../service/prisma.service';

@Controller('v1/users')
export default class UserController {
  @Inject()
  userService: UserService;

  @Logger()
  logger: ILogger;

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get('/withEmail')
  async findAllWithEmail() {
    return this.userService.findAllWithEmail();
  }

  @Post()
  async createUserAndEmail(@Body() userWithPost: UserWithPosts) {
    return this.userService.createUserAndEmail(userWithPost);
  }
}
