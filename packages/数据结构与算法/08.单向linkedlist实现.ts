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
    if (position < 0 || position > this.size) {
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
      // 链表元素不为空
      let preNode = this.header; // position的节点
      let nextNode = this.header.next!; // position位置节点的next节点
      for (let i = 1; i < position; i++) {
        preNode = nextNode;
        nextNode = nextNode.next!;
      }
      // 插入元素
      newNode.next = nextNode;
      preNode.next = newNode;
    }
    this.size++; // 链表长度自增
    return true;
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
}
main();
