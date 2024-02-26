/**
 * @Description: 十进制数字转二进制数字算法
 * @Author: 小钦var
 * @Date: 2023/2/4 12:52
 */
import ArrayStack from "./01.实现ArrayStack结构";

function decimal2binary(decimal: number): string {
  const arrayStack = new ArrayStack<number>();

  // 二进制数字入栈
  while (decimal > 0) {
    const binary = decimal % 2;
    decimal = Math.floor(decimal / 2);
    arrayStack.push(binary);
  }

  let binaryStr = "";
  while (!arrayStack.isEmpty()) {
    binaryStr += arrayStack.pop();
  }
  if (binaryStr.length <= 0) throw new Error("binaryStr长度为0错误");
  return binaryStr;
}

console.log(decimal2binary(10));
console.log(decimal2binary(17));
console.log(decimal2binary(35));
console.log(decimal2binary(107));
