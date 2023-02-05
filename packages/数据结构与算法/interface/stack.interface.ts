import IList from "./list.interface";

export default interface IStack<T> extends IList<T>{
  push(element: T): void;

  pop(): T | undefined;
}
