import assert from "assert";
import ArrayQueue from "./05.ArrayQueue实现";

/**
 * @Description: 面试题：约瑟夫环(队列解决)
 * @Author: 小钦var
 * @Date: 2023/2/5 10:28
 */
function lastRemaining(n: number, m: number): number {
  const arrayQueue = new ArrayQueue<number>();

  // 入队
  for (let i = 0; i < n; i++) {
    arrayQueue.enQueue(i);
  }

  // 击鼓传花原理
  while (arrayQueue.size() > 1) {
    for (let i = 1; i < m; i++)
      arrayQueue.enQueue(arrayQueue.delQueue() as number);
    arrayQueue.delQueue();
  }

  // 最后的数字也是最终的索引
  return arrayQueue.delQueue() as number;
}
assert(lastRemaining(5, 3) === 3);
assert(lastRemaining(10, 17) === 2);
