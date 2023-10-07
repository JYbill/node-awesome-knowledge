/**
 * @Description: 搜索算法：二分查找
 * @Author: 小钦var
 * @Date: 2023/10/7 16:21
 */
function binarySearch(list: number[], target: number): number {
  let i = 0,
    j = list.length - 1;
  while (i <= j) {
    const mid = Math.floor(i + (j - i) / 2);
    const midValue = list[mid];
    if (midValue > target) {
      j = mid - 1;
    } else if (midValue < target) {
      i = mid + 1;
    } else {
      return mid;
    }
  }
  return -1;
}

function test() {
  const list = [0, 5, 15, 25, 33, 41, 45, 57, 100, 150, 200, 300];
  const target = 45;
  const index = binarySearch(list, target);
  console.log("查找索引", index, "value = ", list[index]);
}
test();
export default {};
