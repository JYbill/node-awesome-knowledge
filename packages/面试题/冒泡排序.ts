/**
 * @Description: 冒泡排序
 * @Author: 小钦var
 * @Date: 2024/3/13 09:30
 */
function bubbleSort(list: number[]): number[] {
  for (let i = 0; i < list.length - 1; i++) {
    for (let j = 0; j < list.length - 1 - i; j++) {
      if (list[j] > list[j + 1]) {
        const temp = list[j];
        list[j] = list[j + 1];
        list[j + 1] = temp;
      }
    }
  }
  return list;
}

function main() {
  const list = [];
  for (let i = 0; i < 10; i++) {
    list.push(Math.floor(Math.random() * 100));
  }
  const sorted = bubbleSort(list);
  console.log(sorted);
}
main();
export {};
