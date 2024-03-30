import { num, increment } from "./esm.mjs";

console.log("ESM模块化")
console.log("第一步", num) // 0
console.log("第二步", increment()); // 1
console.log("第三步", num); // 1，共享同一块内存空间，所以值也随着变化了
// console.log("第四步", num += 10); // ❌，TypeError: Assignment to constant variable.
