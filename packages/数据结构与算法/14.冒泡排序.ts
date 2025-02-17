/**
 * @Description: 冒泡排序
 * @Author: 小钦var
 * @Date: 2023/3/21 19:46
 */
import { testSort } from "hy-algokit";

/**
 * 假设一个数组有5个元素进行排序    <br>
 * 第一层循环：需要冒泡的次数，也就是 i < length - 1 = 5 - 1 -> [0, 3] 只需要4次。<br>
 * 第二层循环：保证数组不越界 length - 1，`且之前的排序会冒泡到最后一个元素，所以需要减去冒泡次数提升效率`，j < length - 1 - i   <br>
 * @param list
 */
function bubbleSort(list: number[]): number[] {
  for (let i = 0; i < list.length - 1; i++) {
    let hasSwap = false; // 一旦本次冒泡发现没有交换，说明是一个有序的数组，则后续直接break退出即可
    // 每次排序后最大值在数组最后一位
    for (let j = 0; j < list.length - 1 - i; j++) {
      // 每次只比较(数组长度内 - 已排最值个数) ⚠️ j + 1越界
      if (list[j] > list[j + 1]) {
        hasSwap = true;
        list[j] = list[j] + list[j + 1];
        list[j + 1] = list[j] - list[j + 1];
        list[j] = list[j] - list[j + 1];
      }
    }
    if (!hasSwap) break;
  }
  return list;
}

function main() {
  for (let i = 0; i < 100; i++) {
    testSort(bubbleSort);
  }
}
main();
