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
        currentNode = null;
      } else {
        currentNode = currentNode.next;
      }
    }
    // 循环链表专门添加一个header节点在尾部打印
    printArr.push(this.header.element);
    console.log("header -> " + printArr.join(" -> "));
  }
}

/**
 * 测试：append()、traverse()
 */
function test1() {
  const list = new CircleLinkedList<string>();
  list.append("aaa");
  list.append("bbb");
  list.append("ccc");
  list.traverse();
}
test1(); // header -> aaa -> bbb -> ccc -> aaa
