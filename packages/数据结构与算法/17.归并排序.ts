/**
 * @Description: 归并排序
 * @Author: 小钦var
 * @Date: 2023/3/28 21:16
 */
import { testSort } from "hy-algokit";

function mergeSort(list: number[]): number[] {
  // 1.1 限制条件，长度为1的数组直接返回
  if (list.length === 1) return list;

  // 1. 递归切换数组，直到分成长度唯一的子数组
  const mid = Math.floor(list.length / 2);
  const leftArr = mergeSort(list.slice(0, mid));
  const rightArr = mergeSort(list.slice(mid, list.length));

  // 2. 此时进行合并子数组，最开始是合并长度为1的子数组
  let i = 0;
  let j = 0;
  const mergeList: number[] = [];
  while (i < leftArr.length && j < rightArr.length) {
    if (leftArr[i] <= rightArr[j]) {
      mergeList.push(leftArr[i]);
      i++;
    } else {
      mergeList.push(rightArr[j]);
      j++;
    }
  }

  // 3. 有可能左侧数组全部小于右侧数组，需要清空两边的剩余的元素
  // [1, 2, 3] [4, 5, 6]
  // [1, 2, 3, 4, 5, 6]
  if (i < leftArr.length) {
    mergeList.push.apply(mergeList, leftArr.slice(i));
  }
  if (j < rightArr.length) {
    mergeList.push.apply(mergeList, rightArr.slice(i));
  }
  return mergeList;
}

function main() {
  for (let i = 0; i < 100; i++) {
    testSort(mergeSort);
  }
}
main();
