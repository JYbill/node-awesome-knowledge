/**
 * @Description: 算法：最长递增连续子序列
 * @Author: 小钦var
 * @Date: 2024/3/2 11:30
 */

/*
 * 题目：给定一个数组获取出最长递增子序列
 * [1, 5, 1, 2, 5, 2, 1] -> [1, 2, 5]
 * */

/**
 * longest increasing series
 * @constructor
 */
export function LIS(arr: number[]) {
  if (arr.length <= 0) return arr;

  const series = [[arr[0]]];
  if (arr.length <= 1) return series;

  for (let i = 1; i < arr.length; i++) {
    const num = arr[i];
    console.log(num, typeof num, series);
    seriesHandler(series, num); // 核心逻辑
    console.log("series", series);
  }
  return series[series.length - 1];

  /**
   * series与num之间的处理最有解
   * 思路：
   * [[1], [1, 5]] 此时数值为1时 -> [[1]（覆盖）, [1, 5]]
   * 🚀核心：此时数值为2时，因为2比[1, 5]末尾小，说明是优解但又比[1]小，所以替换，[[1], [1, 2]]
   * ... 以此类推
   *
   * @param series
   * @param num
   */
  function seriesHandler(series: number[][], num: number) {
    for (let i = series.length - 1; i >= 0; i--) {
      const row = series[i]; // 当前行
      const rowMaxNum = row[row.length - 1]; // 当前行最后一个数值，也是最大的数值
      if (i === series.length - 1 && rowMaxNum < num) {
        // 累加
        series.push([...row, num]);
        break;
      } else if (i === 0 && rowMaxNum > num) {
        // 末尾
        series[0] = [num];
      } else if (rowMaxNum < num) {
        // 替换：发现最优解
        series[i + 1] = [...series[i], num];
        break;
      }
    }
  }
}

function test() {
  let arr;
  let res;
  // arr = [1, 5, 1, 2, 5, 2, 1];
  // res = LIS(arr);
  // console.log(arr, "最长递增子序列：", res);
  //
  // arr = [7];
  // res = LIS(arr);
  // console.log(arr, "最长递增子序列：", res);
  //
  // arr = [];
  // res = LIS(arr);
  // console.log(arr, "最长递增子序列：", res);

  arr = [10, 9, 2, 5, 3, 7, 101, 18];
  res = LIS(arr);
  console.log(arr, "最长递增子序列：", res);
}
test();
