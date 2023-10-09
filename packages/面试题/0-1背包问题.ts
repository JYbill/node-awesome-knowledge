/**
 * @Description: 0-1背包问题
 * @Author: 小钦var
 * @Date: 2023/10/8 16:41
 */
/**
 * 每个物品只能选择一次，问在不超过背包容量下能放入物品的最大价值。若当前物品重量超出背包剩余容量，则只能不放入背包。
 * 背包最大重量：cap = 5
 * 编号     重量       价值
 *  i    wgt[i-1]  val[i-1]
 *  1       1        50
 *  2       2        120
 *  3       3        150
 *  4       4        210
 *  5       5        240
 *  最大价值：Max(val) = 270（arr[2] + arr[3], wgt = 5, val = 270）
 */

/**
 * 穷举法
 * @param wgt 重量数组
 * @param val 价值数组
 * @param i 当前编号
 * @param cap 剩余容量
 */
function knapsack01(
  wgt: number[],
  val: number[],
  i: number,
  cap: number
): number {
  if (i === 0 || cap === 0) return 0;

  // 放不下，i-1位，继续处理
  if (wgt[i - 1] > cap) {
    return knapsack01(wgt, val, i - 1, cap);
  }

  const no = knapsack01(wgt, val, i - 1, cap);
  const yes = knapsack01(wgt, val, i - 1, cap - wgt[i - 1]) + val[i - 1];
  return Math.max(no, yes);
}

function knapsack01DP(wgt: number[], val: number[], cap: number): number {
  const n = wgt.length;
  const v = val.length;
  const dp = Array.from({ length: v + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 1; i < n; i++) {
    for (let c = 1; c < cap; c++) {
      if (wgt[i - 1] > c) {
        // 当前物品的重量超过背包体积，无法放入，最大价值为上一个物品的最大价值。且
        dp[i][c] = dp[i - 1][c];
      } else {
        const maxVal = Math.max(
          dp[i - 1][c],
          dp[i - 1][c - wgt[i - 1]] + val[i - 1]
        );
        dp[i][c] = maxVal;
      }
    }
  }

  console.table(dp);
  return dp[v][n];
}

function test() {
  const wgtList = [1, 2, 3, 4];
  const valList = [5, 11, 15];
  const cap = 5;
  // const maxVal = knapsack01(wgtList, valList, wgtList.length, cap); // 穷举01背包
  const maxVal = knapsack01DP(wgtList, valList, cap); // 动态规划01背包
  console.log(`最大价值：${maxVal}`);
}
test();

export {};
