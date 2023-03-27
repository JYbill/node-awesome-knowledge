/**
 * @Description: 选择排序
 * @Author: 小钦var
 * @Date: 2023/3/26 20:52
 */
import { testSort } from "hy-algokit";

/**
 * 选择排序核心算法：
 * 外层循环：每一趟可以得到一个最值
 * 内层循环：扫描最值
 * 每次内层循环结束 === 完成循环+1 === 交换一次
 * @param list
 */
function selectSort(list: number[]): number[] {
  const n = list.length;
  // 每一趟排出一个值
  for (let i = 0; i < n - 1; i++) {
    let index = i;

    // 寻找最值
    for (let j = i + 1; j < n; j++) {
      if (list[j] < list[index]) index = j;
    }

    // 只有最值下标和当前趟不一致时，才需要交换
    if (i !== index) {
      const temp = list[index];
      list[index] = list[i];
      list[i] = temp;
    }
  }
  return list;
}

function main() {
  for (let i = 0; i < 100; i++) {
    testSort(selectSort);
  }
}
main();
