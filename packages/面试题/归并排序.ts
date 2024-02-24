/**
 * @Author: 小钦var
 * @Date: 2023/3/30 19:16
 * @LastEditTime: 2024/01/30 11:21
 */
function sortArray(list: number[]): number[] {
  if (list.length <= 1) return list;

  return [];
}

function main() {
  const testArr = [20, 1, 3, 14, 22, 19, 21];
  const arr = sortArray(testArr);
  console.log(arr);
}

main();
export {};
