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

class Empty {
  name: string;
  age: number;
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
// const res = plainToClass(Test, {name: "500"}, { enableImplicitConversion: true });
// console.log(res)

// console.log(plainToClass(Boolean, "100"));

/**
 * class-transformer如果无法转换时，直接返回原始值
 */
// const url = plainToClass(Empty, 1);
// console.log(url, typeof url);

/**
 * 基本数据类型转class
 * 结论：
 * - 如果可以转为class如Number、String构造函数，则返回转换之后的结果（基本数据类型）
 * - 如果无法转为class如"hello" -> URL，则直接返回原始值""（基本数据类型）
 */
/*const str = plainToClass(URL, "hello");
console.log(str, typeof str);*/

export {}
