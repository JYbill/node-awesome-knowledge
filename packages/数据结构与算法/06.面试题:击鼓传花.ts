import ArrayQueue from "./05.ArrayQueue实现";

/**
 * @Description: 面试题：击鼓传花（队列解决）
 * @Author: 小钦var
 * @Date: 2023/2/5 10:03
 */
function hotPotato(nameList: string[], num: number): number {
  const arrayQueue = new ArrayQueue<string>();
  // 插入队列
  for (const name of nameList) {
    arrayQueue.enQueue(name);
  }
  // 开始击鼓传花，过滤到所有成员只有一个时，结束击鼓传花
  while (arrayQueue.size() > 1) {
    for (let i = 1; i < num; i++) {
      const name: string = arrayQueue.delQueue() as string;
      arrayQueue.enQueue(name);
    }
    arrayQueue.delQueue();
  }

  // 花获谁家
  const latestName = arrayQueue.delQueue() as string;
  console.log("花落: ", latestName);
  return nameList.indexOf(latestName);
}

const nameList = ["小张", "小明", "小青蛙", "小钦", "xqv", "xiaoqinvar"];
const index = hotPotato(nameList, 1);
console.log("中奖索引: ", index);
// 花落:  xiaoqinvar
// 中奖索引:  5
