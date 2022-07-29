import { ILogger } from '@midwayjs/core';
import { Aspect, IMethodAspect, JoinPoint, Logger } from '@midwayjs/decorator';
import AopController from '../controller/aop.controller';

@Aspect(AopController)
export class AopAspect implements IMethodAspect {
  @Logger()
  logger: ILogger;

  /**
   * 执行前
   * @param joinPoint 切点对象，包含该AopController的信息
   */
  async before(joinPoint: JoinPoint) {
    // this.logger.info(joinPoint);
  }

  /**
   * 执行后
   * @param joinPoint 切点对象，包含该AopController的信息
   * @param result 执行该方法的返回值
   * @param error 无错误为undefined，有错为错误
   */
  after(joinPoint: JoinPoint, result: any, error: Error) {
    // this.logger.info(joinPoint);
    // this.logger.info(result);
    // this.logger.info(error);
  }
}
