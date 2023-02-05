import IList from "./list.interface";

export default interface IQueue<T> extends IList<T> {
  enQueue(element: T): void;
  delQueue(): T | undefined;
}
