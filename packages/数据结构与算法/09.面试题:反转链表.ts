/**
 * @Description: 力扣面试题：273反转链表
 * @Author: 小钦var
 * @Date: 2023/2/7 11:21
 */
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

/**
 * 反转链表方法一：栈解决方案；最容易理解，效率最低
 * @param head
 */
function reverseList1(head: ListNode | null): ListNode | null {
  if (head === null || head.next === null) return head;

  // 节点入栈
  const arrStack: ListNode[] = [];
  let current: ListNode | null = head;
  while (current) {
    arrStack.push(current);
    current = current.next;
  }

  let newHead = arrStack.pop()!; // 只指向头节点，并作新head返回
  let node = newHead; // 指针从头移动到尾部
  while (arrStack.length) {
    const nextNode = arrStack.pop();
    if (!nextNode) {
      console.error("nextNode: ", nextNode);
      throw new Error("此处pop不应该为空 ｜ undefined");
    }
    node.next = nextNode;
    node = nextNode;
  }
  // 为反转：head -> ... -> foot -> null
  // 已反转：foot -> ... -> head(节点反转应该设置为空)
  node.next = null;
  return newHead;
}

/**
 * 反转链表方法二：循环解决方案；效率高
 *
 * 1.
 * null -> 0 -> 1 -> 2 -> 3 -> 4
 *   p     c    n
 *
 * 2.
 * null <- 0    1 -> 2...
 *         p    c    n...
 * @param head
 */
function reverseList2(head: ListNode | null): ListNode | null {
  if (head === null || head.next === null) return head;

  let prev = null;
  let current: ListNode | null = head;
  while (current) {
    const next: ListNode | null = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
}

/**
 * 反转链表方法三：递归解决方案；效率高，远离参考循环反转链表思路
 * @param head
 */
function reverseList3(head: ListNode | null): ListNode | null {
  if (head === null || head.next === null) return head;

  const newHead = reverseList3(head.next); // 返回的这个是新的head头节点，只起到引用作用而已
  // 此时的head是最后一个元素的前一个节点
  //                        v
  // null -> 0 -> 1 -> 2 -> 3 -> 4
  // 操作流程
  // null -> 0 -> 1 -> 2 -> 3 <- 4
  //                        v
  //                       null
  //
  // null -> 0 -> 1 -> 2 <- 3 <- 4
  //                   v
  //                  null
  head.next.next = head;
  head.next = null;
  return newHead;
}

function test() {
  const head = new ListNode(0);
  const node1 = new ListNode(1);
  const node2 = new ListNode(2);
  const node3 = new ListNode(3);
  const node4 = new ListNode(4);
  head.next = node1;
  node1.next = node2;
  node2.next = node3;
  node3.next = node4;
  node4.next = null;

  // 反转方法
  // const reverseHead = reverseList1(head); // 栈解决链表反转
  // const reverseHead = reverseList2(head); // 循环解决链表反转
  const reverseHead = reverseList3(head); // 递归解决链表反转
  // print结果
  let current: ListNode | null = reverseHead;
  const printArr: number[] = [];
  while (current) {
    printArr.push(current.val);
    current = current.next;
  }
  console.log(printArr.join(" -> "));
}
test();
