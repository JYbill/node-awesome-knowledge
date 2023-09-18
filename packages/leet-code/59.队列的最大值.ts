/**
 * 有BUG
 * @Description: 剑指 Offer 59 - II. 队列的最大值
 * @Author: 小钦var
 * @Date: 2023/9/12 14:24
 */
class MaxQueue {
  private queue: number[] = [];
  private deque: number[] = []; // 单调队列：呈递减趋势，队头最大值，后续依次递减

  max_value(): number {
    if (this.deque.length <= 0) return -1;
    // console.log(this.queue, this.deque); // debug
    return this.deque[0];
  }

  push_back(value: number): void {
    this.queue.push(value);

    if (this.deque.length >= 1) {
      // deque存在，从头遍历，将小于当前插入的值移除，从而保证单调递减队列
      while (value > this.deque[0]) {
        this.deque.shift();
      }
    }
    this.deque.push(value);
  }

  pop_front(): number {
    if (this.queue.length <= 0) return -1;
    const value = this.queue.shift() as number;
    if (this.deque[0] === value) {
      this.deque.shift();
    }
    return value;
  }
}

/**
 * Your MaxQueue object will be instantiated and called as such:
 * var obj = new MaxQueue()
 * var param_1 = obj.max_value()
 * obj.push_back(value)
 * var param_3 = obj.pop_front()
 */

function test() {
  // 测试一
  const maxQueue = new MaxQueue();
  console.log(maxQueue.max_value());
  maxQueue.push_back(1);
  maxQueue.push_back(2);
  console.log(maxQueue.max_value());
  maxQueue.pop_front();
  console.log(maxQueue.max_value());
  maxQueue.push_back(5);
  maxQueue.push_back(3);
  maxQueue.push_back(2);
  console.log(maxQueue.max_value());
  maxQueue.pop_front();
  console.log(maxQueue.max_value());
  maxQueue.pop_front();
  console.log(maxQueue.max_value());
  maxQueue.pop_front();
  console.log(maxQueue.max_value());
  // 测试二
  /*const maxQueue = new MaxQueue();
  console.log(maxQueue.max_value());
  maxQueue.pop_front();
  console.log(maxQueue.max_value());*/
}
test();
export {};
