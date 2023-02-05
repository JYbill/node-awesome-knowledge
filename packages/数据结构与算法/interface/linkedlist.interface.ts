export default interface ILinkedList<T> {
  append(element: T): void;
  insertAt(position: number, element: T): boolean;
  traverse(): void;
}
