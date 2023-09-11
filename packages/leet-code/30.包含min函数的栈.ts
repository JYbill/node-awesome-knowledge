/**
 * @Description: 无
 * @Author: 小钦var
 * @Date: 2023/9/9 10:17
 */
class MinStack {
  private stack: number[] = [];
  private minStack: number[] = []; // 存储比栈帧小的元素

  push(x: number): void {
    this.stack.push(x);
    if (this.minStack.length <= 0) {
      this.minStack.push(x);
      return;
    }

    if (this.top() >= x) {
      this.minStack.push(x);
    }
  }

  pop(): void {
    if (this.stack.length <= 0) {
      return;
    }
    this.stack.pop();
    this.minStack.pop();
  }

  top(): number {
    return this.stack[this.stack.length - 1];
  }

  min(): number {
    let standard = this.minStack[0];
    for (const value of this.minStack) {
      if (value < standard) standard = value;
    }
    return standard;
  }
}

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.min()
 */
/**
 * DEMO
 * MinStack minStack = new MinStack();
 * minStack.push(-2);
 * minStack.push(0);
 * minStack.push(-3);
 * minStack.min();   --> 返回 -3.
 * minStack.pop();
 * minStack.top();      --> 返回 0.
 * minStack.min();   --> 返回 -2.
 */
function test() {
  const minStack = new MinStack();
  minStack.push(-2);
  minStack.push(0);
  minStack.push(-3);
  console.log(minStack.min());
  minStack.pop();
  console.log(minStack.top());
  console.log(minStack.min());
}

test();
