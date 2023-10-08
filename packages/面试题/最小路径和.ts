/**
 * @Description: 动态规划：最小路径和
 * @Author: 小钦var
 * @Date: 2023/10/8 15:39
 */

/**
 * 给定n * m网格，每次只能向下或者向右移动一步，直至到达右下角单元格。请返回从左上角到右下角的最小路径和。
 * 如：
 * 1    3    1    5
 * 2    2    4    2
 * 5    3    2    1
 * 4    3    5    2
 * 最佳方案：1 -> 2 -> 2 -> 3 -> 2 -> 1 -> 2 = 13
 */
function shortestPathDP(grid: number[][]): number {
  const n = grid[0].length;
  const m = grid.length;

  const dp = Array.from({ length: n }, () => new Array(m).fill(0));

  // 初始化DP初始表
  dp[0][0] = grid[0][0];
  for (let i = 1; i < n; i++) {
    dp[0][i] = grid[0][i] + dp[0][i - 1];
  }
  for (let j = 1; j < m; j++) {
    dp[j][0] = grid[j][0] + dp[j - 1][0];
  }

  // 动态规划核心
  for (let i = 1; i < n; i++) {
    for (let j = 1; j < m; j++) {
      dp[i][j] = Math.min(dp[i][j - 1], dp[i - 1][j]) + grid[i][j];
    }
  }

  console.table(dp);
  return 0;
}

function test() {
  const grid = [
    [1, 3, 1, 5],
    [2, 2, 4, 2],
    [5, 3, 2, 1],
    [4, 3, 5, 2],
  ];
  const count = shortestPathDP(grid);
  console.log(`最短路径：${count}`);
}
test();

export {};
