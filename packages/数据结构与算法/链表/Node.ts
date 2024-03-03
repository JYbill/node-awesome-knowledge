/**
 * 单向节点
 */
export class Node<T = any> {
  constructor(public element: T, public next: Node<T> | null = null) {}
}

/**
 * 双向节点
 */
export class DbNode<T = any> extends Node<T> {
  constructor(
    public element: T,
    public next: DbNode<T> | null = null,
    public prev: DbNode<T> | null = null
  ) {
    super(element, next);
  }
}
