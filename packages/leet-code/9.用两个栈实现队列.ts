/**
 * Your CQueue object will be instantiated and called as such:
 * var obj = new CQueue()
 * obj.appendTail(value)
 * var param_2 = obj.deleteHead()
 */
class CQueue {
  private queue: number[] = [];

  constructor(value?: number) {
    if (value !== undefined) {
      this.queue.push(value);
    }
  }

  appendTail(value: number): void {
    this.queue.push(value);
  }

  deleteHead(): number {
    const value = this.queue.shift();
    return value ? value : -1;
  }
}

function test() {
  // const commandList = [
  //   "CQueue",
  //   "appendTail",
  //   "deleteHead",
  //   "deleteHead",
  //   "deleteHead",
  // ];
  // const dataList = [[], [3], [], [], []];
  // 正确结果：[ null, null, 3, -1, -1 ]

  // const commandList = [
  //   "CQueue",
  //   "deleteHead",
  //   "appendTail",
  //   "appendTail",
  //   "deleteHead",
  //   "deleteHead",
  // ];
  // const dataList = [[], [], [5], [2], [], []];

  const commandList = [
    "CQueue",
    "appendTail",
    "deleteHead",
    "deleteHead",
    "deleteHead",
  ];
  const dataList = [[], [3], [], [], []];

  const resQueue: (number | null)[] = [];
  let queue = null;

  for (let i = 0; i < commandList.length; i++) {
    const cmd = commandList[i];
    const value = dataList[i][0];
    switch (cmd) {
      case "CQueue":
        queue = new CQueue(value);
        resQueue.push(null);
        break;

      case "appendTail":
        if (!queue) throw new TypeError("queue为空错误");
        queue.appendTail(value);
        resQueue.push(null);
        break;

      case "deleteHead":
        if (!queue) throw new TypeError("queue为空错误");
        const head = queue.deleteHead();
        resQueue.push(head);
        break;
    }
  }

  console.log("输出结果", resQueue);
}
test();
