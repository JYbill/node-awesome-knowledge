/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 *
 */
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val ?? 0;
    this.next = next === undefined ? null : next;
  }
}

function reversePrint(head: ListNode | null): number[] {
  const stack: ListNode[] = [];

  let point = head;
  while (point !== null) {
    stack.push(point);
    point = point.next;
  }

  const list: number[] = [];
  for (let i = stack.length - 1; i >= 0; i--) {
    const value = stack[i].val;
    list.push(value);
  }

  return list;
}

function test() {
  const node3 = new ListNode(3);
  const node2 = new ListNode(2, node3);
  const node1 = new ListNode(1, node2);
  // const res = reversePrint(node1); // 测试一
  // console.log(res); // 期望打印：[3, 2, 1]

  // const res = reversePrint(null); // 测试二
  // console.log(res); // 期望打印：[]

  const res = reversePrint(node2); // 测试三
  console.log(res); // 期望打印：[]
}
test();
