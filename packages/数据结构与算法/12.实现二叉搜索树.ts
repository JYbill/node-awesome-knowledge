/**
 * @Description: 实现二叉搜索树
 * @Author: 小钦var
 * @Date: 2023/2/13 20:28
 */

import { btPrint } from "hy-algokit";

/**
 * 二叉树节点
 */
class TreeNode<T> {
  left: TreeNode<T> | null = null;
  right: TreeNode<T> | null = null;
  parent: TreeNode<T> | null = null; // 父节点
  value: T;
  constructor(data: T) {
    this.value = data;
  }
}

/**
 * 二叉树数据结构
 */
export default class BSTree<T = any> {
  private root: TreeNode<T> | null = null;
  private printList: T[] = [];

  /**
   * 打印
   */
  print(): void {
    btPrint(this.root as any);
  }

  /**
   * 插入元素
   * @param value
   */
  insert(value: T) {
    const newNode = new TreeNode(value);

    // 不存在根节点
    if (!this.root) this.root = newNode;
    else this.inertNodeByCompare(this.root, newNode);
  }

  /**
   * 前序遍历
   */
  preOrderTraverse() {
    this.printList = [];
    this.preOrderTraverseNode(this.root);
    // this.preOrderByLoop(this.root);
    console.log(this.printList);
  }
  private preOrderTraverseNode(node: TreeNode<T> | null) {
    if (node) {
      this.printList.push(node.value);
      this.preOrderTraverseNode(node.left);
      this.preOrderTraverseNode(node.right);
    }
  }

  /**
   * 前序循环遍历
   * @param node
   * @private
   */
  private preOrderByLoop(node: TreeNode<T> | null) {
    const stack: TreeNode<T>[] = [];
    while (node || stack.length >= 1) {
      // node存在或栈内未清空
      while (node) {
        // 只要node存在即遍历左节点
        this.printList.push(node.value);
        stack.push(node);
        node = node.left;
      }

      // 当左节点遍历完后，弹栈开始遍历右节点，并再次进入循环遍历该右节点下的左节点
      // 直到栈清空、左右节点都遍历完
      node = stack.pop() ?? null;
      node = node ? node.right : null;
    }
  }

  /**
   * 中序遍历
   */
  inOrderTraverse() {
    this.printList = [];
    this.inOrderTraverseNode(this.root);
    console.log(this.printList);
  }
  inOrderTraverseNode(node: TreeNode<T> | null) {
    if (node) {
      this.inOrderTraverseNode(node.left);
      this.printList.push(node.value);
      this.inOrderTraverseNode(node.right);
    }
  }

  /**
   * 后续遍历
   */
  postOrderTraverse() {
    this.printList = [];
    this.postOrderTraverseNode(this.root);
    console.log(this.printList);
  }
  postOrderTraverseNode(node: TreeNode<T> | null) {
    if (node) {
      this.postOrderTraverseNode(node.left);
      this.postOrderTraverseNode(node.right);
      this.printList.push(node.value);
    }
  }

  /**
   * 层序遍历
   * 层序遍历推荐用循环实现很容易理解，也很简单
   */
  levelOrderTraverse() {
    this.printList = [];
    if (!this.root) {
      console.log(this.printList);
      return;
    }

    const queue: TreeNode<T>[] = [];
    queue.push(this.root);

    // 当队列中不再存在树节点时，意味着完成了层序遍历
    while (queue.length >= 1) {
      const node = queue.shift() as TreeNode<T>;
      this.printList.push(node.value); // 获取队列中的出队节点

      // 如果有左子节点和右子节点则放入队列中
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    console.log(this.printList);
  }

  /**
   * 获取最大值
   */
  getMaxValue(): T | null {
    let node = this.root;
    if (!node) return null;
    while (node?.right) {
      node = node.right;
    }
    return node.value;
  }

  /**
   * 获取最小值
   */
  getMinValue(): T | null {
    let node = this.root;
    if (!node) return null;
    while (node?.left) {
      node = node.left;
    }
    return node.value;
  }

  /**
   * 是否存在当前值
   * @param value
   */
  has(value: T): boolean {
    /*let node = this.root;
    if (!node) return false;

    while (node) {
      if (node.value === value) {
        return true;
      } else if (value < node.value) {
        node = node.left;
      } else {
        node = node.right;
      }
    }
    return false;*/

    return !!this.searchNode(value);
  }

  /**
   * 递归查找适合插入的位置
   * @param node 对比已存在的树节点
   * @param newNode 需要插入的节点
   * @private
   */
  private inertNodeByCompare(node: TreeNode<T>, newNode: TreeNode<T>): void {
    // 插入规则：左小右大
    if (newNode.value < node.value) {
      if (!node.left) {
        node.left = newNode;
      } else {
        this.inertNodeByCompare(node.left, newNode);
      }
    } else {
      if (!node.right) {
        node.right = newNode;
      } else {
        this.inertNodeByCompare(node.right, newNode);
      }
    }
  }

  /**
   * 删除节点
   * 思路：
   *  1. value是否存在二叉树中
   *  2. 要被删除的node是一个叶子节点，需要拿到它的父节点
   *  3. 要被删除的node有一个节点
   *  4. 要被删除的node有两个节点
   */
  remove(value: T): boolean {
    const node = this.searchNode(value);
    console.log(node?.parent?.value);
    return false;
  }

  /**
   * 查询并设置节点的parent
   * @param value
   * @private
   */
  private searchNode(value: T): TreeNode<T> | null {
    let node = this.root;
    if (!node) return null; // 不存在节点

    let parent = null;
    let current = this.root;
    while (current) {
      if (current.value === value) {
        current.parent = parent;
        return current;
      }

      parent = current;
      if (value < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    // 未找到节点
    return null;
  }
}

function main() {
  const bsTree = new BSTree<number>();
  bsTree.insert(11);
  bsTree.insert(7);
  bsTree.insert(15);
  bsTree.insert(5);
  bsTree.insert(3);
  bsTree.insert(9);
  bsTree.insert(8);
  bsTree.insert(10);
  bsTree.insert(13);
  bsTree.insert(12);
  bsTree.insert(14);
  bsTree.insert(20);
  bsTree.insert(18);
  bsTree.insert(25);
  bsTree.insert(6);
  bsTree.print();
  /*  console.log("前序遍历：");
  bsTree.preOrderTraverse();*/

  /*console.log("中序遍历：");
  bsTree.inOrderTraverse();
  console.log("后序遍历：");
  bsTree.postOrderTraverse();
  console.log("层序遍历：");
  bsTree.levelOrderTraverse();*/

  /*console.log("二叉树最大值：");
  console.log(bsTree.getMaxValue());
  console.log("二叉树最小值：");
  console.log(bsTree.getMinValue());
  console.log("二叉树是否存在值：");
  console.log(bsTree.has(25));
  console.log(bsTree.has(3));
  console.log(bsTree.has(19));
  console.log(bsTree.has(4));
  console.log(bsTree.has(20));*/

  console.log("二叉树删除节点：");
  bsTree.remove(11);
  bsTree.remove(5);
}
main();
