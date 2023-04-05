import * as string_decoder from "string_decoder";
import { LinkedList } from "../数据结构与算法/08.单向linkedlist实现";

/**
 * @Description: leetCode21：合并两个有序链表
 * @Author: 小钦var
 * @Date: 2023/4/2 10:07
 */
class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function mergeTwoLists(
  list1: ListNode | null,
  list2: ListNode | null
): ListNode | null {
  if (list1 === null) return list2;
  else if (list2 === null) return list1;
  // 递归比较大小
  else if (list1.val < list2.val) {
    list1.next = mergeTwoLists(list1.next, list2);
    return list1;
  } else {
    list2.next = mergeTwoLists(list1, list2.next);
    return list2;
  }
}

function main() {
  const node13 = new ListNode(3);
  const node12 = new ListNode(2, node13);
  const node11 = new ListNode(1, node12);

  const node24 = new ListNode(3);
  const node23 = new ListNode(2, node24);
  const node22 = new ListNode(1, node23);
  const resNode = mergeTwoLists(node11, node22);

  let first = resNode?.next;
  while (first) {
    console.log(first.val);
    first = first.next;
  }
}
main();
