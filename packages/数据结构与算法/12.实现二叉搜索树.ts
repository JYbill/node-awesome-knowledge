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
}
main();
