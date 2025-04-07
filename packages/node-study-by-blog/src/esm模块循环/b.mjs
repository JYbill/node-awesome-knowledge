import * as a from "./a.mjs"
let b = "原始值-b模块内变量"
export { b }
console.log("[b.mjs] a =", a)
b = "修改值-b模块内变量"
