/**
 * @Author: 小钦var
 * @Date: 2023/3/30 20:14
 * @LastEditTime: 2025-02-11 11:09:00
 */
function quickSort(list: number[]): number[] {
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
export {};
