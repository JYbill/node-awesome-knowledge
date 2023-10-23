import ILinkedList from "../interface/linkedlist.interface";

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
  length: number = 0;
  footer: Node<T> | null = null;

  /**
   * 长度
   */
  size(): number {
    return this.length;
  }

  /**
   * 根据索引获取节点内容
   * @param position
   */
  getAt(position: number): T | null {
    if (position < 0 || position >= this.length) {
      console.error("getAt索引越界");
      return null;
    }
    const [_, currentNode] = this.getNode(position);
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
    this.length++; // 链表长度自增

    // header为空
    if (this.header === null) {
      this.header = newNode;
      this.footer = newNode;
      return;
    }

    // 找到最后一个节点
    this.footer!.next = newNode;
    this.footer = newNode;
  }

  /**
   * 根据位置插入元素
   * @param position
   * @param element
   */
  insertAt(position: number, element: T): boolean {
    if (position < 0 || position >= this.length) {
      console.error(`链表insertAt position ${position}越界`);
      return false;
    }

    const newNode = new Node(element);
    if (this.header === null) {
      // 链表元素为空
      this.header = newNode;
      this.footer = newNode;
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
    this.length++; // 链表长度自增
    return true;
  }

  /**
   * 根据位置删除节点
   * @param position
   */
  removeAt(position: number): T | null {
    if (position < 0 || position >= this.length) return null;

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

      if (position === this.length - 1) {
        this.footer = preNode;
      }
    }
    this.length--;
    return (removeNode as Node<T>).element;
  }

  /**
   * 根据给定元素进行删除，存在即返回，不存在返回null
   * @param element
   */
  removeBy(element: T): T | null {
    const index = this.indexOf(element);
    if (index <= -1) {
      console.error("removeBy链表中不存在该元素");
      return null;
    }

    return this.removeAt(index);
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
    console.log(`footer元素: ${this.footer?.element}`);
  }

  /**
   * 根据索引修改元素内容
   * @param position
   * @param element
   */
  updateAt(position: number, element: T): boolean {
    if (position < 0 || position >= this.length) {
      console.error("updateAt链表索引越界");
      return false;
    }
    const [_, currentNode] = this.getNode(position);
    (currentNode as Node<T>).element = element;
    return true;
  }

  /**
   * 根据元素值查询对应的索引位置
   * @param element 元素值
   */
  indexOf(element: T): number {
    let currentNode = this.header;
    let index = 0;
    do {
      if (currentNode?.element === element) {
        return index;
      }
      currentNode = currentNode?.next ?? null;
      index++;
    } while (currentNode);
    return -1;
  }

  /**
   * 链表是否为空
   */
  isEmpty(): boolean {
    return this.length === 0;
  }

  private getNode(position: number): [Node<T>, Node<T> | null] {
    if (position < 0 || position >= this.length) {
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
  // linkedList.removeAt(2); // 测试删除尾节点
  // linkedList.removeBy("3"); // 测试删除尾节点
  linkedList.traverse();
}

main();
