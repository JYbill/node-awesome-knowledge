import "reflect-metadata";
import {Expose, plainToClass, Transform, Type} from "class-transformer";
import {IsBoolean, IsNumber, IsString} from 'class-validator';

/**
 * @Description: 测试class-transformer、class-validator转换规则
 * @Author: 小钦var
 * @Date: 2024/11/1 09:22
 */

function logType(target: any, key: string) {
}

class Test {

  // @IsBoolean()
  // age: boolean;

  // @Transform((e) => {
  //   console.log('transform', e);
  //   return e.obj[e.key]; // 结果以最后一次为准
  // })
  // @Expose({ name: 'aka' })
  // name: number;

  @logType
  name: number;
}
const res = plainToClass(Test, {name: "500"}, { enableImplicitConversion: true });
console.log(res)

// console.log(plainToClass(Boolean, "100"));

export {}
