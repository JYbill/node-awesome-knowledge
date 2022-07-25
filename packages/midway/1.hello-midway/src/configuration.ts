import { Configuration, App, Controller } from '@midwayjs/decorator';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import { DefaultErrorFilter } from './filter/default.filter';
import { NotFoundFilter } from './filter/notfound.filter';
import { ReportMiddleware } from './middleware/report.middleware';
import {
  ILifeCycle,
  IMidwayContainer,
  IObjectLifeCycle,
  ObjectBeforeCreatedOptions,
  ObjectBeforeDestroyOptions,
  ObjectCreatedOptions,
  ObjectInitOptions,
} from '@midwayjs/core';
import * as defaultConfig from './config/config.default';
import * as unittestConfig from './config/config.unittest';
import * as localConfig from './config/config.local';

@Configuration({
  imports: [
    koa,
    validate,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  // importConfigs: [join(__dirname, './config')],
  importConfigs: [
    {
      default: defaultConfig,
      local: localConfig,
      unittest: unittestConfig,
    },
  ],
})
export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: koa.Application;

  async onReady(applicationContext: IMidwayContainer) {
    // add middleware
    this.app.useMiddleware([ReportMiddleware]);
    // add filter
    this.app.useFilter([NotFoundFilter, DefaultErrorFilter]);
  }
}
