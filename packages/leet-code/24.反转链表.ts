/**
 * @Description: 剑指offer 24.反转链表
 * @Author: 小钦var
 * @Date: 2023/8/17 09:10
 */
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val ?? 0;
    this.next = next === undefined ? null : next;
  }
}

/**
 * 反转链表方法一：三指针for循环
 * 核心思想：prev指针记录前一个，curr指针为当前，nextNode元素为下一个节点
 * 注意点：每次只移动prev和curr，nextNode为下一次循环的curr！
 * @param head
 */
function reverseList1(head: ListNode): ListNode {
  if (!head?.next) return head;

  let prev = null;
  let curr = head;

  while (curr.next !== null) {
    const nextNode = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextNode;
  }
  curr.next = prev;
  return curr;
}

/**
 * 反转链表方法二：递归
 * 核心思想：通过递归拿到倒数第二个node，node.next.next = head表示将最后一个元素修改为它的前一个元素，也就是当前元素
 *          再将当前元素的next设置为null, 递归执行将第一个元素的next设置为null
 * @param head
 */
function reverseList2(head: ListNode | null): ListNode | null {
  if (head === null || head.next === null) return head;

  const newHead = reverseList2(head.next);
  if (!newHead) throw new Error("node此处不应该为null, 请检查代码");
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
  const node5 = new ListNode(5);
  const node6 = new ListNode(6);
  head.next = node1;
  node1.next = node2;
  node2.next = node3;
  node3.next = node4;
  node4.next = node5;
  node5.next = node6;
  node6.next = null;

  // 反转方法
  // const reverseHead = reverseList1(head); // 栈解决链表反转
  const reverseHead = reverseList2(head); // 循环解决链表反转
  // const reverseHead = reverseList3(head); // 递归解决链表反转
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
