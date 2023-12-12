/**
 * @Description: 选择排序
 * @Author: 小钦var
 * @Date: 2023/12/5 09:21
 */
function selectSort(list: number[]): number[] {
  for (let i = 0; i < list.length - 1; i++) {
    for (let j = i + 1; j < list.length; j++) {
      if (list[i] > list[j]) {
        const temp = list[j];
        list[j] = list[i];
        list[i] = temp;
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
  const sorted = selectSort(list);
  console.log(sorted);
}
main();
export {};
