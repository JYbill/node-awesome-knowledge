/**
 * @Description: 无
 * @Author: 小钦var
 * @Date: 2023/9/12 11:19
 */

/**
 * 输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3
 * 输出: [3,3,5,5,6,7]
 * 解释:
 *
 *   滑动窗口的位置                最大值
 * ---------------               -----
 * [1  3  -1] -3  5  3  6  7       3
 *  1 [3  -1  -3] 5  3  6  7       3
 *  1  3 [-1  -3  5] 3  6  7       5
 *  1  3  -1 [-3  5  3] 6  7       5
 *  1  3  -1  -3 [5  3  6] 7       6
 *  1  3  -1  -3  5 [3  6  7]      7
 *
 */

function maxSlidingWindow(nums: number[], k: number): number[] {
  if (nums.length <= 0 || k <= 0) return [];

  const resList = [];

  // 初始化获取第一个滑动窗口的值
  const slidingWindow = [nums[0]];
  let max: number = nums[0];
  for (let i = 1; i < k; i++) {
    if (nums[i] > max) {
      max = nums[i];
    }
    slidingWindow.push(nums[i]);
  }
  resList.push(max);
  // console.log(slidingWindow, max); // debug

  // 循环进行滑动滑动窗口
  for (let i = k; i < nums.length; i++) {
    const num = nums[i];
    const removeNum = slidingWindow.shift() as number;

    // 1. 滑动加入的数字 > max，所以 max = 加入的数字
    if (num > max) {
      max = num;
      slidingWindow.push(num);
      resList.push(max);
      continue;
    }

    // 2. 加入的数字 < max 且 移出的数字 < max，所以max不变
    if (removeNum < max) {
      slidingWindow.push(num);
      resList.push(max);
    } else {
      // 3. 加入的数字 < max && 移出的数字 >= max, 此时要重新计算max最大数字
      slidingWindow.push(num);
      const sortedMax = [...slidingWindow].sort((a, b) => b - a);
      max = sortedMax[0];
      // console.log(sortedMax, max); // debug
      resList.push(max);
    }
    // console.log(slidingWindow); // debug
  }
  return resList;
}

function test() {
  // const demo = [1, 3, -1, -3, 5, 3, 6, 7];
  const demo = [7, 2, 4];
  console.time("耗时");
  const list = maxSlidingWindow(demo, 2);
  console.timeEnd("耗时");
  console.log(list);
}
test();

export {};
