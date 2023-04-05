/**
 * @Description: leetCod53：合并区间
 * @Author: 小钦var
 * @Date: 2023/4/2 09:21
 */

function merge(intervals: number[][]): number[][] {
  // 数组排序
  intervals = intervals.sort((current, next) => current[0] - next[0]);
  const mergeList: number[][] = []; // 存储合并区间的数组

  // 检查数组区间并合并
  for (let i = 0; i < intervals.length; i++) {
    const L = intervals[i][0];
    const R = intervals[i][1];

    // 1. 如果合并区间为空，合并区间 || 区间[0]大于合并区间最大值[1]同样放入
    if (mergeList.length === 0 || L > mergeList[mergeList.length - 1][1]) {
      mergeList.push(intervals[i]);
    }

    // 经过第一步，可以确定L必定在合并区间范围内，可能有区间[1]大于[left, right]right范围内
    // |[left, right]         |
    // |    [区间[0], 区间[1]] |
    // |                      |
    // 该情况将right设置为区间[1]即可
    else if (R > mergeList[mergeList.length - 1][1]) {
      mergeList[mergeList.length - 1][1] = R;
    }
  }
  return mergeList;
}

function main() {
  let testList = [
    [2, 6],
    [1, 3],
    [15, 18],
    [8, 10],
  ];
  let resList = merge(testList);
  console.log("测试输入：", testList);
  console.log("测试结果：", resList);

  testList = [
    [1, 4],
    [0, 4],
  ];
  resList = merge(testList);
  console.log("测试输入：", testList);
  console.log("测试结果：", resList);
}
main();
