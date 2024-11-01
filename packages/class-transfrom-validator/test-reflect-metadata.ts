import "reflect-metadata";

/**
 * @Description: 测试reflect-metadata原理
 * @Author: 小钦var
 * @Date: 2024/11/1 09:22
 */
function logType(target: any, key: string) {

  const t = Reflect.getMetadata("design:type", target, key);
  console.log(target, key, t.name);
  console.log(`${key} type: ${t.name}`); // 会打印出 attr1 type: String
}

class Demo {
  @logType
  attr1: number = 1;
}
