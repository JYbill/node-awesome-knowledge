/**
 * @Description: 实现koa中间件
 * @Author: 小钦var
 * @Date: 2023/2/14 17:48
 */
const middleware: any = [];

function use(mw: any): void {
  middleware.push(mw);
}

use(async function (ctx: any, next: any) {
  console.log("next前，第一个中间件");
  await next();
  console.log("next后，第一个中间件");
});
use(async function (ctx: any, next: any) {
  console.log("next前，第二个中间件");
  await next();
  console.log("next后，第二个中间件");
});
use(async function (ctx: any, next: any) {
  console.log("next前，第三个中间件");
  await next();
  console.log("next后，第三个中间件");
});

/**
 * 核心思想：
 * A before --next--> B before --next--> C before
 *                                           |
 * A after <--next--  B after  <--next-- C after
 * 只有当中间件调用next()后即绑定下一个中间件，下一个中间件next绑定下下一个中间件，递归以此类推
 * @param middleware
 */
function compose(middleware: any) {
  return (ctx: any, next: any) => {
    // 执行next的核心方法
    function dispatch(i: any): any {
      const fn = middleware[i];
      if (!fn) return;
      return fn(ctx, dispatch.bind(null, i + 1)); // 这里一定要记住是绑定，而不是执行，执行交给中间件执行！
    }
    return dispatch(0); // 第一个中间件开始
  };
}

const fn: any = compose(middleware);
fn();
