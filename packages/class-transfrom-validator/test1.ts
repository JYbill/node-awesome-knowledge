import "reflect-metadata";
import {Expose, plainToClass, Transform, Type} from "class-transformer";
import {IsBoolean, IsNumber, IsString} from 'class-validator';

class Test {

  // @IsBoolean()
  // age: boolean;

  @Transform((e) => {
    console.log('transform', e);
    return e.obj[e.key]; // 结果以最后一次为准
  })
  @Expose({ name: 'aka' })
  name: number;
}
const res = plainToClass(Test, {age: 0, name: "false"}, { enableImplicitConversion: true });
console.log(res)

export {}
