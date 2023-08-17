/**
 * @Description: 剑指Offer 20.表示数值的字符串
 * @Author: 小钦var
 * @Date: 2023/8/16 10:19
 */
/**
 * 数值：
 *    1. (可选)若干空格
 *    2. 小数 / 整数
 *    3. (可选)"e" / "E" + 整数
 *    4. (可选)若干空格
 *
 * 小数：
 *    1. （可选）一个符号字符（'+' 或 '-'）
 *    2. 下述格式之一：
 *       - 至少一位数字，后面跟着一个点 '.'
 *       - 至少一位数字，后面跟着一个点 '.' ，后面再跟着至少一位数字
 *       - 一个点 '.' ，后面跟着至少一位数字
 *
 * 整数：
 *    1. （可选）一个符号字符（'+' 或 '-'）
 *    2. 至少一位数字
 */
function isNumber(s: string): boolean {
  return false;
}

function test() {
  const list = [
    "+100",
    "5e2",
    "-123",
    "3.1416",
    "-1E-16",
    "0123",
    "12e",
    "1a3.14",
    "1.2.3",
    "+-5",
    "12e+5.4",
  ];
  const resList: boolean[] = [];
  for (const str of list) {
    resList.push(isNumber(str));
  }
  console.log("结果", resList);
}
test();
