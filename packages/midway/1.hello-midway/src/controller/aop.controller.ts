import { Controller, Get, Inject } from '@midwayjs/decorator';

@Controller('aop')
export default class AopController {
  @Get()
  async index() {
    return 'ok.';
  }
}
