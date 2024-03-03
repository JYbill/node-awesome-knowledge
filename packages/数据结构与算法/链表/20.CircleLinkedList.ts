import { LinkedList, Node } from "./19.重构LinkedList";

/**
 * @Description: 循环链表
 * @Author: 小钦var
 * @Date: 2024/2/24 13:32
 */
export class CircleLinkedList<T> extends LinkedList<T> {
  /**
   * 循环链表的尾部追加操作
   * @param element
   */
  append(element: T) {
    super.append(element);
    this.footer!.next = this.header;
  }

  /**
   * 循环链表打印
   */
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
        if (currentNode.next !== this.header) {
          throw TypeError("ERROR:尾节点不是指向头节点");
        }
        currentNode = null;
      } else {
        currentNode = currentNode.next;
      }
    }
    // 循环链表专门添加一个header节点在尾部打印
    printArr.push(this.header.element);
    console.log("header -> " + printArr.join(" -> "));
  }

  /**
   * 插入元素
   * @param position
   * @param element
   */
  insertAt(position: number, element: T): boolean {
    const isComplete = super.insertAt(position, element);
    if (isComplete) {
      if (position === 0) {
        this.footer!.next = this.header;
      }
    }
    return isComplete;
  }

  /**
   * 移除元素
   * @param position
   */
  removeAt(position: number): T | null {
    const isComplete = super.removeAt(position);
    if (isComplete) {
      if (position === 0 || position === this.length) {
        this.footer!.next = this.header;
      }
    }
    return isComplete;
  }

  indexOf(element: T): number {
    return super.indexOf(element);
  }
}

function test() {
  const list = new CircleLinkedList<string>();
  list.append("aaa");
  list.append("bbb");
  list.append("ccc");
  list.traverse(); // header -> aaa -> bbb -> ccc -> aaa

  // 测试insertAt
  /*console.log("\n ========== insertAt测试 ==========");
  list.insertAt(0, "000");
  list.traverse();
  console.log("插入失败应该返回false，结果：", list.insertAt(4, "333"));*/
  // 测试removeAt
  /*console.log("\n ========== removeAt测试 ==========");
  list.removeAt(0);
  list.traverse();
  list.removeAt(1);
  list.traverse();*/
  // 测试indexOf
  /*console.log("\n ========== indexOf测试 ==========");
  console.log("index: 0正确, 结果：", list.indexOf("aaa"));
  console.log("index: 2正确, 结果：", list.indexOf("ccc"));
  console.log("index: -1正确, 结果：", list.indexOf("aka"));*/
  // 测试removeBy
  /*console.log("\n ========== removeBy测试 ==========");
  console.log("正确结果：null。", list.removeBy("aka"));
  console.log("正确结果：aaa。", list.removeBy("aaa"));
  console.log("正确结果：ccc。", list.removeBy("ccc"));
  list.traverse(); // header -> bbb -> bbb*/
}
test();
