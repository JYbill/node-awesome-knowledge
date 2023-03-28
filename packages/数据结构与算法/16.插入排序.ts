/**
 * @Description: 插入排序
 * @Author: 小钦var
 * @Date: 2023/3/27 21:01
 */
import { testSort } from "hy-algokit";

/**
 * 插入排序核心思路：
 * 从索引第一个开始和它后面的开始对比，也就是arr[1] > arr[0]即找到插入位置即交换
 * 内层循环，比较i索引之前的所有，两个条件：
 *    1. 内层循环j一定要大于等于0，为0意味着是第一元素了不会再有其他元素比较了
 *    2. arr[j]值比temp大/小时最后交换、
 *    提示：如果j开始一直可以交换，突然不能交换时，当前索引一定要j + 1才是需要被插入的索引(因为比较的序列都是有序的)
 * 循环结束：arr[j + 1] === 需要被插入的元素
 * @param list
 */
function insertionSort(list: number[]): number[] {
  const n = list.length;

  for (let i = 1; i < n; i++) {
    const temp = list[i];

    let j = i - 1;

    // 🥕 寻找插入索引，同时将有序索引挨个向后移动一个，为插入的元素腾位置
    // [1, 2, 5, 9, 3, 11] 1. 需要给3元素进行插入
    // [1, 2, 5, 5, 9, 11] 2. 此时循环干的就是找插入索引位置，且进行腾位置移动操作
    while (j >= 0 && list[j] > temp) {
      list[j + 1] = list[j];
      j--;
    }
    // [1, 2, 3, 5, 9, 11] 3. 此时索引为arr[1]，索引需要arr[1 + 1] = arr[2] = 3

    // 此时拿到的j是需要插入的索引的前一个，所以需要j+1确保正确的插入
    list[j + 1] = temp;
  }
  return list;
}

function main() {
  for (let i = 0; i < 100; i++) {
    testSort(insertionSort);
  }
}
main();
