/**
 * @file: 32.linkedList.js
 * @author: xiaoqinvar
 * @desc：实现链表
 * @date: 2022-07-03 17:28:31
 */

const { threadId } = require('worker_threads');

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
    if (index >= this.length) {
      throw new Error('数量越界');
    }

    let resultNode = this.head;
    // console.log(index);
    while (--index >= 1) {
      // console.log(index);
      // console.log(resultNode);
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
    if (!this.head) {
      console.log('null');
      return;
    }
    let node = this.head;
    while (node.next) {
      console.log(node);
      node = node.next;
    }
    console.log(node);
    return node;
  }

  /**
   * 移除指定下表带节点，起始0
   * @param {*} index
   */
  remove(index) {
    if (index >= this.length) {
      throw new Error('index more than size.');
    }
    const before = this.get(index - 1);
    const next = before.next.next;
    // console.log(before, next);
    before.next = next;
  }
}

class Queue {
  linkedList;
  constructor(content) {
    this.linkedList = new LinkList(content);
  }

  add(content) {
    this.linkedList.add(content);
  }

  debug() {
    this.linkedList.forEach();
  }

  remove(index) {
    // 头部删除
    if (index === 0) {
      this.linkedList.head = this.linkedList.head.next;
      this.linkedList.length--;
      return;
    }
    this.linkedList.remove(index);
  }
}

const queue = new Queue('im first.');
queue.add('second.');
// queue.debug();
// console.log(' ===== remove ===== ');
queue.remove(1);
queue.debug();
