export default interface IList<T> {
  peek(): T | undefined;

  size(): number;

  isEmpty(): boolean;
}
