import { LinkedList, Node } from "./19.重构LinkedList";
import { DbNode } from "./Node";

/**
 * 双向链表
 */
export class DoublyLinked<T extends any> extends LinkedList<T> {
  header: DbNode<T> | null = null;
  length: number = 0;
  footer: DbNode<T> | null = null;

  /**
   * 追加数据
   * @param element
   */
  append(element: T) {
    const node = new DbNode(element);

    // header为空
    if (!this.header) {
      this.header = node;
      this.footer = node;
    } else {
      this.footer!.next = node;
      node.prev = this.footer;
      this.footer = node;
    }
    this.length++;
  }

  /**
   * 头部添加元素
   * @param element
   */
  prepend(element: T) {
    const node = new DbNode(element);
    if (!this.header) {
      this.header = node;
      this.footer = node;
    } else {
      this.header.prev = node;
      node.next = this.header;
      this.header = node;
    }
    this.length++;
  }

  traverse() {
    if (this.header === null) {
      console.log("header -> null");
      return;
    }

    // 链表存在节点
    const printArr: T[] = [];
    let currentNode: Node<T> | null = this.header;
    while (currentNode !== null) {
      printArr.push(currentNode.element);

      if (this.isTail(currentNode)) {
        // 最后一个节点，停止循环
        // DEBUG调试
        currentNode = null;
      } else {
        currentNode = currentNode.next;
      }
    }
    console.log("header -> " + printArr.join(" -> "));
  }

  /**
   * 倒序遍历
   */
  postTraverse() {
    if (!this.footer) {
      console.log("footer -> null");
      return;
    }

    // 链表存在节点
    const printArr: T[] = [];
    let currentNode: DbNode<T> | null = this.footer;
    while (currentNode !== null) {
      printArr.push(currentNode.element);
      currentNode = currentNode.prev;
    }
    console.log("footer -> " + printArr.join(" -> "));
  }

  /**
   * 双向链表插入
   */
  insertAt(pos: number, element: T) {
    if (pos < 0 || pos >= this.length) return false;

    // 插入
    if (pos === 0) {
      // 头插入
      this.prepend(element);
    } else if (pos === this.length - 1) {
      // 尾插入
      this.append(element);
    } else {
      // 中间插入
      const node = new DbNode(element);
      const [prevNode, nextNode] = this.getNode(pos) as [DbNode<T>, DbNode<T>];
      prevNode.next = node;
      node.prev = prevNode;
      node.next = nextNode;
      nextNode.prev = node;
      this.length++;
    }
    return true;
  }

  /**
   * 双向节点根据索引删除
   * @param pos
   */
  removeAt(pos: number): T | null {
    if (pos < 0 || pos >= this.length) return null;
    let removeValue;
    if (pos === 0) {
      // 头
      removeValue = this.header!.element;
      if (!this.header?.next) {
        // 总共就一个几点的情况
        this.header = null;
        this.footer = null;
      } else {
        const nextNode = this.header.next;
        this.header = nextNode;
      }
    } else if (pos === this.length - 1) {
      // 尾
      removeValue = this.footer!.element;
      this.footer = this.footer!.prev;
      this.footer!.next = null;
    } else {
      // 中间删除
      const [prevNode, currentNode] = this.getNode(pos) as [
        DbNode<T>,
        DbNode<T>
      ];
      removeValue = currentNode.element;
      prevNode.next = currentNode.next;
      currentNode.next!.prev = prevNode;
    }
    this.length--;
    return removeValue;
  }

  removeBy(element: T): T | null {
    const pos = this.indexOf(element);
    return this.removeAt(pos);
  }
}

function testAppend() {
  const list = new DoublyLinked();
  list.append("aaa");
  list.append("bbb");
  list.append("ccc");
  list.prepend("222");
  list.prepend("111");
  list.traverse(); // header -> 111 -> 222 -> aaa -> bbb -> ccc
  list.postTraverse(); // footer -> ccc -> bbb -> aaa -> 222 -> 111
}
// testAppend();

function testInsert() {
  const list = new DoublyLinked();
  list.append("bbb");
  list.append("ccc");
  list.insertAt(0, "aaa");
  list.insertAt(3, "bad");
  list.insertAt(2, "end");
  list.traverse();
}
// testInsert();

function testRemoveAt() {
  const list = new DoublyLinked();
  list.append("aaa");
  list.append("bbb");
  list.append("ccc");
  list.traverse();
  console.log(list.removeAt(3));
  console.log(list.removeAt(2));
  console.log(list.removeAt(0));
  console.log(list.removeBy("aaa")); // null
  console.log(list.removeBy("bbb"));
  list.traverse();
}
testRemoveAt();
