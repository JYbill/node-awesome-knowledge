/**
 * @Description: 快速排序
 * @Author: 小钦var
 * @Date: 2023/3/29 19:48
 */
import { testSort } from "hy-algokit";

/**
 * 快速排序：在原数组的基础上进行划分基准(privet)，并进行递归交换排序
 * @param list
 */
function quickSort(list: number[]): number[] {
  const n = list.length;
  divide(0, n - 1);

  /**
   * 快速排序核心逻辑
   * @param left
   * @param right
   */
  function divide(left: number, right: number) {
    if (left >= right) return;

    const privet = right; // 基准
    let i = left;
    let j = right - 1;

    // ⚠️ 这里的条件一定要是i在j的右边，不能相等
    while (i <= j) {
      while (list[i] < list[privet]) i++; // i 找比 `privet` 大的（左侧找比基准大的）
      while (list[j] > list[privet]) j--; // j 找比 `privet` 小的（右侧找比基准小的）

      // 仅当i在j的左侧且不想等时才允许交换，如果i到了j的右侧意味着顺序已经是对的了
      if (i <= j) {
        swap(list, i, j);
        i++;
        j--;
      }
    }

    // console.log(list);
    // 上面的循环结束代表i、j的交换完成，开始下一轮递归分割基准、交换...
    // 交换基准
    swap(list, i, right);

    // 递归
    divide(left, i - 1);
    divide(i + 1, right);
  }
  return list;
}

function swap(list: number[], index1: number, index2: number) {
  const temp = list[index1];
  list[index1] = list[index2];
  list[index2] = temp;
}

function main() {
  for (let i = 0; i < 100; i++) {
    testSort(quickSort);
  }
}
main();
