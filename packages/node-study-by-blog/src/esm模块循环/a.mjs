import * as b from "./b.mjs"
let a = "原始值-a模块内变量"
export { a }
console.log("[a.mjs] b =", b)
a = "修改值-a模块内变量"
