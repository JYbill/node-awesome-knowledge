export default interface ILinkedList<T> {
  getAt(position: number): T | null;
  append(element: T): void;
  insertAt(position: number, element: T): boolean;
  removeAt(position: number): T | null;
  removeBy(element: T): T | null;
  updateAt(position: number, element: T): boolean;
  indexOf(element: T): number;
  isEmpty(): boolean;
  traverse(): void;
}
