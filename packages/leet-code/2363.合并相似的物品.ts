/**
 * @Description: 2363.合并相似的物品
 * @Author: 小钦var
 * @Date: 2023/2/28 15:47
 */
/*
 * 题目：给你两个二维整数数组`items1`和`items2`，表示两个物品集合。每个数组items有以下特质：
 *      items[i] = [valueI, weightI] 其中valueI表示第i件物品的价值，weightI表示第i件物品的重量。
 *      items中每件物品的价值都是唯一的。
 *      请你返回一个二维数组ret。
 *      其中ret[i] = [valueI, weightI]，weightI是所有价值为valueI物品的重量之和。
 *      > 注意：ret应该按价值 升序排序后返回。
 * */

/**
 * 示例：
 * 输入：items1 = [[1,1],[4,5],[3,8]],
 *      items2 = [[3,1],[1,5]]
 * 输出：[[1,6],[3,9],[4,5]]
 * 解释：
 * value = 1 的物品在 items1 中 weight = 1 ，在 items2 中 weight = 5 ，总重量为 1 + 5 = 6 。
 * value = 3 的物品再 items1 中 weight = 8 ，在 items2 中 weight = 1 ，总重量为 8 + 1 = 9 。
 * value = 4 的物品在 items1 中 weight = 5 ，总重量为 5 。
 * 所以，我们返回 [[1,6],[3,9],[4,5]] 。
 */
function mergeSimilarItems(items1: number[][], items2: number[][]): number[][] {
  const map = new Map();
  for (const item of items1) {
    map.set(item[0], item[1]);
  }
  for (const item of items2) {
    const exist = map.get(item[0]);
    if (exist) {
      map.set(item[0], exist + item[1]);
    } else {
      map.set(item[0], item[1]);
    }
  }

  const res: number[][] = [];
  for (const [k, v] of map.entries()) res.push([k, v]);

  // 排序
  for (let i = 0; i < res.length - 1; i++) {
    for (let j = i + 1; j < res.length; j++) {
      if (res[i][0] > res[j][0]) {
        const temp = res[i];
        res[i] = res[j];
        res[j] = temp;
      }
    }
  }
  return res;
}

const demo1 = mergeSimilarItems(
  [
    [1, 1],
    [4, 5],
    [3, 8],
  ],
  [
    [3, 1],
    [1, 5],
  ]
);
console.log(demo1);

const demo2 = mergeSimilarItems(
  [
    [1, 1],
    [3, 2],
    [2, 3],
  ],
  [
    [2, 1],
    [3, 2],
    [1, 3],
  ]
);
console.log(demo2);

const demo3 = mergeSimilarItems(
  [
    [1, 3],
    [2, 2],
  ],
  [
    [7, 1],
    [2, 2],
    [1, 4],
  ]
);
console.log(demo3);
