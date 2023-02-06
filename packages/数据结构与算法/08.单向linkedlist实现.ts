import ILinkedList from "./interface/linkedlist.interface";

/**
 * @Description: 实现单向链表
 * @Author: 小钦var
 * @Date: 2023/2/5 11:57
 */
export class Node<T = any> {
  constructor(public element: T, public next: Node<T> | null = null) {}
}

export class LinkedList<T = any> implements ILinkedList<T> {
  header: Node<T> | null = null;
  size: number = 0;

  getAt(position: number): T | null {
    if (position < 0 || position >= this.size) {
      console.error("getAt索引越界");
      return null;
    }
    const [preNode, currentNode] = this.getNode(position);
    const current = currentNode;
    // 处理ts校验
    if (!current) {
      console.error("请检查链表结果，此处不应该为", current);
      return null;
    }
    return current.element;
  }

  /**
   * 末尾插入元素
   * @param element
   */
  append(element: T): void {
    const newNode = new Node(element);
    this.size++; // 链表长度自增

    // header为空
    if (this.header === null) {
      this.header = newNode;
      return;
    }

    // 找到最后一个节点
    const lastNode = this.findLastNode();
    lastNode.next = newNode;
  }

  /**
   * 根据位置插入元素
   * @param position
   * @param element
   */
  insertAt(position: number, element: T): boolean {
    if (position < 0 || position >= this.size) {
      console.error(`链表insertAt position ${position}越界`);
      return false;
    }

    const newNode = new Node(element);
    if (this.header === null) {
      // 链表元素为空
      this.header = newNode;
    } else if (position === 0) {
      // 在链表头部添加
      newNode.next = this.header;
      this.header = newNode;
    } else {
      const [preNode, currentNode] = this.getNode(position);
      // 插入元素
      newNode.next = currentNode;
      preNode.next = newNode;
    }
    this.size++; // 链表长度自增
    return true;
  }

  /**
   * 根据位置删除节点
   * @param position
   */
  removeAt(position: number): T | null {
    if (position < 0 || position >= this.size) return null;

    let removeNode = null;
    if (position === 0) {
      // 头节点指下个节点
      removeNode = this.header;
      this.header = this.header?.next ?? null;
    } else {
      // 删除中间或者最后
      const [preNode, currentNode] = this.getNode(position);
      removeNode = currentNode;
      preNode.next = currentNode?.next ?? null;
    }
    this.size--;
    return (removeNode as Node<T>).element;
  }

  /**
   * 遍历打印链表
   */
  traverse(): void {
    if (this.header === null) {
      console.log("header -> null");
      return;
    }

    // 链表存在节点
    const printArr: T[] = [];
    let currentNode: Node<T> | null = this.header;
    while (currentNode !== null) {
      printArr.push(currentNode.element);
      currentNode = currentNode.next;
    }
    console.log("header -> " + printArr.join(" -> "));
  }

  /**
   * 获取最后一个节点
   * @private
   * @return Node<T> 获取链表最后一个Node节点
   */
  private findLastNode(): Node<T> {
    let currentNode = this.header as Node<T>;
    while (currentNode.next !== null) {
      currentNode = currentNode.next;
    }
    return currentNode;
  }

  private getNode(position: number): [Node<T>, Node<T> | null] {
    if (position < 0 || position >= this.size) {
      throw Error(`getNode链表索引越界：${position}`);
    }
    let currentNode = this.header;
    let preNode: Node<T> | null = null;
    let index = 0;
    while (index++ < position && currentNode) {
      preNode = currentNode;
      currentNode = currentNode.next;
    }
    return [preNode!, currentNode];
  }
}

function main() {
  const linkedList = new LinkedList<string>();
  linkedList.append("1");
  linkedList.append("2");
  linkedList.append("3");
  linkedList.traverse();
  linkedList.insertAt(1, "1.1");
  linkedList.insertAt(0, "0");
  linkedList.insertAt(5, "4");
  linkedList.traverse();

  // 删除测试
  console.log("删除第一个元素: ", linkedList.removeAt(0));
  linkedList.traverse();
  console.log("删除中间元素: ", linkedList.removeAt(2));
  linkedList.traverse();
  console.log("删除最后元素: ", linkedList.removeAt(3));
  linkedList.traverse();

  // getAt测试
  console.log("getAt测试 ------>");
  console.log(linkedList.getAt(0));
  console.log(linkedList.getAt(1));
  console.log(linkedList.getAt(2));
  console.log(linkedList.getAt(-1));
  console.log(linkedList.getAt(3));
  console.log("getAt测试 <------");
}
main();
