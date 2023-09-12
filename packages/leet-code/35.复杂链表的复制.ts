/**
 * @Description: 剑指offer 35 复杂链表的复制
 * @Author: 小钦var
 * @Date: 2023/9/12 11:08
 */
/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */
class Node {
  constructor(
    public val: any,
    public next?: Node | null,
    public random?: Node | null
  ) {
    this.val = val;
    this.next = next;
    this.random = random;
  }
}

/**
 * @param {Node} head
 * @return {Node}
 */
const copyRandomList = function (head: Node) {
  if (!head) return null;
  let p: Node | null | undefined = head;
  const nodeMap = new Map();
  nodeMap.set(null, null);

  while (p) {
    nodeMap.set(p, new Node(p.val));
    p = p.next;
  }
  // console.log(nodeMap);
  p = head;
  while (p) {
    nodeMap.get(p).next = nodeMap.get(p.next);
    nodeMap.get(p).random = nodeMap.get(p.random);
    p = p.next;
  }
  return nodeMap.get(head);
};

function test() {
  const node1 = new Node(1);
  const node2 = new Node(2);
  const node3 = new Node(3);
  node1.next = node2;
  node2.next = node3;
  node3.next = null;

  node1.random = node3;
  node2.random = null;
  node3.random = node3;

  const res = copyRandomList(node1);
  let p: null | undefined | Node = res;
  while (p) {
    console.log(p.val, p.random);
    p = p.next;
  }
}
test();

export {};
