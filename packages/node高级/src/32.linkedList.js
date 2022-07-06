/**
 * @file: 32.linkedList.js
 * @author: xiaoqinvar
 * @desc：实现链表
 * @date: 2022-07-03 17:28:31
 */
// 节点
class Node {
  content;
  next;

  constructor(content, next = null) {
    this.content = content;
    this.next = next;
  }
}

// linkedList
class LinkList {
  head;
  length;
  constructor(content) {
    this.head = new Node(content);
    this.length = 1;
  }

  /**
   * 添加节点，默认插入第一个节点
   * 添加节点，插入到beforeTargetNode之后
   * @param {*} content
   */
  add(content, beforeTargetNode) {
    // 头部插入
    if (arguments.length === 1) {
      const afterTargetNode = this.head;
      this.setNode(content, this.head);
      return;
    }

    // 指定节点之前插入
    this.setNode(content, beforeTargetNode, beforeTargetNode.next);
  }

  /**
   * 获取第n个节点
   * @param {*} index
   * @returns
   */
  get(index) {
    if (index > this.length) {
      throw new Error('数量越界');
    }

    let resultNode = this.head;
    while (--index) {
      resultNode = resultNode.next;
    }
    return resultNode;
  }

  /**
   * 工具方法：在beforeNode之后，afterNode之前插入节点
   * @param {*} content
   * @param {*} beforeNode
   * @param {*} afterNode
   */
  setNode(content, beforeNode, afterNode = null) {
    const node = new Node(content, afterNode);
    beforeNode.next = node;
    this.length++;
  }

  /**
   * 迭代，返回最后一个node
   * @returns
   */
  forEach() {
    let node = this.head;
    while (node.next) {
      console.log(node);
      node = node.next;
    }
    console.log(node);
    return node;
  }
}

const linkedList = new LinkList('im first node.');
console.log('初始化', linkedList);

linkedList.add('im second node.');
console.log('插入头部', linkedList);

const secondNode = linkedList.get(2);
console.log('获取第二个节点', secondNode);

linkedList.add('im third node.', secondNode);
console.log('插入指定节点', linkedList);
console.log('----- for -----');
const lastNode = linkedList.forEach();
linkedList.setNode('now! im last node', lastNode);
linkedList.forEach();
