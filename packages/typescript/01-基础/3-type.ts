/**
 * @file: 3-type.ts
 * @author: xiaoqinvar
 * @desc：type细节
 * @date: 2022-10-15 15:51:38
 */
/* 
type TName = {
  name: string;
};
type TAge = {
  age: number;
};
type TPerson1 = TName | TAge;
type TPerson2 = TName & TAge;

// ❌ class无法实现联合类型
class Person2 implements TPerson1 {
  name: string = "xiaoqinvar";
  age: number = 23;
}
// ✅
class Person3 implements TPerson2 {
  name: string = "xiaoqinvar";
  age: number = 23;
} */

// type 、interface被class实现
/* interface IPerson {
  name?: string;
}
type TPerson = {
  name?: string;
};
class Person1 implements IPerson {}
class Person2 implements TPerson {} */

// 交叉类型
/* interface IHuman {
  name: string;
}
interface Person {
  age: number;
}
const coder: IHuman & Person = {
  name: "xqv.",
  age: 23,
}; */

// 类型断言
// 默认返回Element类型，断言为HTMLImageElement类型
/* const el = document.querySelector(".id") as HTMLImageElement;
el.src = "img/address";

const id = "10011" as any;
console.log(id.map(() => 1)); */

// 字面量类型
/* const name: "xiaoqinvar" = "xiaoqinvar";
let age: 23 = 23;

const method: methodType = "GET";
type methodType = "GET" | "POST" | "PUT" | "DELETE";
const info = {
  url: "http://www.baidu.com",
  method: "GET",
} as const;
function request(url: string, method: methodType) {}
request(info.url, info.method); */

// 类型缩小
/* function printID(id: string | number) {
  if (typeof id === "string") {
    // id: string
    console.log("your id is", id.toUpperCase());
  } else {
    // id: number
    console.log(id);
  }
}
printID(100);
printID("11011"); */

// 相等缩小
/* type operationType = "up" | "down" | "left" | "right";
function operationFunc(operation: operationType) {
  switch (operation) {
    case "left":
      // operation: left
      console.log(operation);
      break;
    case "right":
      // operation: right
      console.log(operation);
      break;
    case "up":
      // operation: up
      console.log(operation);
      break;
    case "down":
      // operation: down
      console.log(operation);
      break;
  }
} */

// 类型缩小：instanceof
/* function getDate(date: Date | string) {
  if (date instanceof Date) {
    console.log(date); // date: Date
  } else {
    console.log(date); // date: string
  }
} */

// 类型缩小：in
type animalType = {
  age: number;
  move: () => void;
};
type humanType = {
  name: string;
  say: () => string;
};
function logAnimalInfo(animal: animalType | humanType) {
  if ("age" in animal) {
    console.log(animal.age); // animal: animalType
  } else if ("name" in animal) {
    console.log(animal.name); // animal: humanType
  }
}

export {};
