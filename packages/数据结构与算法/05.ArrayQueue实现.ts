import IQueue from "./interface/queue.interface";
import assert from "assert";

/**
 * @Description: 数组队列的实现
 * @Author: 小钦var
 * @Date: 2023/2/5 09:20
 */
export default class ArrayQueue<T> implements IQueue<T> {
  private queue: T[] = [];

  delQueue(): T | undefined {
    return this.queue.shift();
  }

  enQueue(element: T): void {
    this.queue.push(element);
  }

  isEmpty(): boolean {
    return this.queue.length === 0;
  }

  peek(): T | undefined {
    return this.queue[0];
  }

  size(): number {
    return this.queue.length;
  }
}

function main() {
  const arrayQueue = new ArrayQueue<number>();
  arrayQueue.enQueue(1);
  arrayQueue.enQueue(2);
  arrayQueue.enQueue(3);
  assert.ok(arrayQueue.peek() === 1);
  assert(arrayQueue.size() === 3);
  console.log("queue长度", arrayQueue.isEmpty());
  arrayQueue.delQueue();
  arrayQueue.delQueue();
  arrayQueue.delQueue();
  assert(arrayQueue.size() === 0);
  console.log("queue长度", arrayQueue.isEmpty());
}

// main();
