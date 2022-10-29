declare module "xqv" {
  export function join<T>(...args: T[]): T;
}

declare function foo(): "Hello World";

declare class Person {
  constructor(public name: string, public age: number) {}
}

declare module "*.jpeg";
declare module "*.jpg";
declare module "*.png";
declare module "*.svg";
