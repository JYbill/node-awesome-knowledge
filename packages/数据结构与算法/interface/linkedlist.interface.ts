export default interface ILinkedList<T> {
  getAt(position: number): T | null;
  append(element: T): void;
  insertAt(position: number, element: T): boolean;
  removeAt(position: number): T | null;
  traverse(): void;
}
