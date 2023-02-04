export default interface IStack<T> {
  push(element: T): void;

  pop(): T | undefined;

  peek(): T | undefined;

  size(): number;

  isEmpty(): boolean;
}
