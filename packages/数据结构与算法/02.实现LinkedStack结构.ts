import IStack from "./interface/stack.interface";

/**
 * @Description: 基于链表实现的Stack结构
 * @Author: 小钦var
 * @Date: 2023/2/4 12:22
 */
class LinkedStack<T = any> implements IStack<T>{
  isEmpty(): boolean {
    return false;
  }

  peek(): T | undefined {
    return undefined;
  }

  pop(): T | undefined {
    return undefined;
  }

  push(element: T): void {
  }

  size(): number {
    return 0;
  }

}
