/**
 * @author: xiaoqinvar
 * @desc: 基于Array实现的栈结构
 * @date: 2023-02-04 11:43:31
 */
import IStack from "./interface/stack.interface";

// 数组实现的Stack
export default class ArrayStack<T = any> implements IStack<T>{
  private stack: T[] = [];

  /**
   * 入栈
   */
  push(element: T): void {
    this.stack.push(element);
  }

  /**
   * 出栈
   */
  pop(): T | undefined {
    return this.stack.pop();
  }

  /**
   * 获取栈帧元素，不修改栈
   * @returns 元素 ｜ undefined
   */
  peek(): T | undefined {
    if (this.isEmpty()) return undefined;
    return this.stack[this.stack.length - 1];
  }

  /**
   * 获取栈的长度
   * @returns number
   */
  size(): number {
    return this.stack.length;
  }

  /**
   * 栈是否为空
   * @returns boolean
   */
  isEmpty(): boolean {
    return this.stack.length <= 0;
  }
}


// 测试代码
async function main() {
  const stack1 = new ArrayStack();
  stack1.push(1);
  stack1.push("2");
  stack1.push({name: "xqv"});
  console.log(stack1.size());
  console.log(stack1.peek());
  stack1.pop();
  stack1.pop();
  stack1.pop();
  stack1.pop();
  stack1.pop();
  console.log(stack1.isEmpty());
  console.log(stack1.size());
  console.log(stack1.peek());
}

// main();
