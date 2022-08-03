import { Controller, Get, Inject } from '@midwayjs/decorator';
import { UserService } from '../service/prisma.service';

@Controller('v1/users/')
export default class UserController {
  @Inject()
  userService: UserService;

  @Get()
  async findAll() {
    return this.userService.findAll();
  }
}
