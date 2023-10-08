/**
 * @Description: 回溯 + 记忆算法：爬楼梯
 * @Author: 小钦var
 * @Date: 2023/10/8 13:59
 */

/**
 * 爬楼梯：每次只能走一格或2格，所以爬1格可以走1，爬2格可以走1、2，爬3格可以走（1->3, 1->2->3，2->3）
 * 规律f(n) = f(n-1) + f(n-2)
 * @param i
 * @param mem {number[]} 空间换时间节省计算量
 */
function dps(i: number, mem: number[]): number {
  // f(1) === 1（1）, f(2) === 2（1, 2）
  if (i === 1 || i === 2) return i;

  // 未计算过
  if (mem[i] === -1) {
    const count = dps(i - 1, mem) + dps(i - 2, mem);
    mem[i] = count;
    return count;
  } else {
    // 计算过直接返回结果
    return mem[i];
  }
}

function test() {
  const target = 9;
  const memo = new Array(target + 1).fill(-1);
  const count = dps(target, memo);
  console.log(`爬${target}层可以有${count}种走法.`);
}
test();
export {};
