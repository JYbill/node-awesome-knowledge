let { num, increment } = require("./cjs.cjs");

console.log("cjs模块化")
console.log("第一步", num) // 0
console.log("第二步", increment()); // 1
console.log("第三步", num); // 0，此时我们发现num值没变化，所以CJS对于基本数据类型是值拷贝
console.log("第四步", num = num + 10); // 10
