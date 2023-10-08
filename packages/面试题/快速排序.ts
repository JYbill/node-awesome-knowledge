/**
 * @Description: 打卡9.25✅
 * @Author: 小钦var
 * @Date: 2023/3/30 20:14
 */

function quickSort(list: number[]): number[] {
  function divide(left: number, right: number): void {
    if (left >= right) return;

    const standard = list[right];
    let i = left,
      j = right - 1;
    while (i <= j) {
      while (list[i] < standard) i++;
      while (list[j] > standard) j--;
      if (i <= j) {
        swap(list, i, j);
      }
    }
    swap(list, i, right);
    divide(left, i - 1);
    divide(i + 1, right);
  }
  divide(0, list.length - 1);
  return list;
}

function swap(list: number[], index1: number, index2: number): void {
  const temp = list[index1];
  list[index1] = list[index2];
  list[index2] = temp;
}

function main() {
  const testList = [11, 22, 0, 1, 2, 8, 3, 28];
  const sortList = quickSort(testList);
  console.log(sortList);
}

main();
