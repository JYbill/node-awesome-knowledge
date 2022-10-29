import { add } from "./math";
const uname: string = "xqv";
console.log(uname);
console.log(add(1, 2));

// dom
const h1El = document.createElement("h1");
h1El.textContent = "Hello TS";
document.body.append(h1El);

// 给第三方库编写类型声明文件
import xqv from "xqv";
const str: string = xqv.join("Hello", "TS");
const say: "Hello World" = foo();
const p: Person = new Person("xqv", 23);
