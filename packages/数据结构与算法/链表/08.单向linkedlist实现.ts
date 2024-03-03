import ILinkedList from "../interface/linkedlist.interface";
import { Node } from "./Node";
/**
 * @Description: 实现单向链表
 * @Author: 小钦var
 * @Date: 2023/2/5 11:57
 */
export class LinkedList<T = any> implements ILinkedList<T> {
  header: Node<T> | null = null;
  length: number = 0;

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
    if (position < 0 || position >= this.length) {
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
  console.log("删除越界: ", linkedList.removeAt(3));
  linkedList.traverse();

  // getAt测试
  console.log("getAt测试 ------>");
  console.log(linkedList.getAt(0));
  console.log(linkedList.getAt(1));
  console.log(linkedList.getAt(2));
  console.log(linkedList.getAt(-1));
  console.log(linkedList.getAt(3));
  console.log("getAt测试 <------");

  // updateAt测试
  console.log("updateAt测试 ------->");
  linkedList.updateAt(0, "测试");
  linkedList.updateAt(2, "索引为2");
  linkedList.traverse();
  console.log("updateAt测试 <-------");

  // indexOf测试
  console.log("indexOf测试 ------->");
  console.log(linkedList.indexOf("测试"));
  console.log(linkedList.indexOf("索引为2"));
  linkedList.traverse();
  console.log("indexOf测试 <-------");

  // removeBy测试
  console.log("removeBy测试 ------->");
  console.log(linkedList.removeBy("测试"));
  console.log(linkedList.removeBy("索引为2"));
  console.log(linkedList.removeBy("1.1"));
  linkedList.traverse();
  console.log("removeBy测试 <-------");

  // isEmpty测试
  console.log("isEmpty测试 ------->");
  console.log(linkedList.isEmpty());
  linkedList.traverse();
  console.log("isEmpty测试 <-------");
}

main();
