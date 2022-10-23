/**
 * @file: 21-枚举.ts
 * @author: xiaoqinvar
 * @desc：枚举
 * @date: 2022-10-23 12:36:49
 */

// 默认从0开始
/* enum Operation {
  UP, // 默认为0
  DOWN, // 上一位为数子，默认递增
} */

// 前一位枚举为number类型时会递增
/* enum Operation {
  UP = 100,
  DOWN, // 101
} */

// 前一位枚举为string类型时必须初始化
/* enum Operation {
  UP = 100,
  DOWN, // 101
  LEFT = "left",
  RIGHT = "right", // 这里必须初始化，string or number
} */

// 枚举运算时，只允许包含number类型，枚举成员如果存在string类型会报错
// 位运算的好处： READ(1) | WRITE(2)的位或运算操作的结果位00000011(3)，更加方便
enum Operation {
  READ = 1 << 0,
  WRITE = 1 << 1,
  UPDATE = 1 << 2,
  DEL = 1 << 3,
  // ERROR = "error", // ❌ 如果这样写会报错
}
export {};
