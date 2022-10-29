import { list, listTest, listTestMethodAOP } from "./api/module/entire";

// 公共拦截器
// const listRes = await list({ offset: 0, size: 20 });
// console.log("list", listRes?.errcode);

// 测试自定义实例拦截器
// const test = await listTest({ offset: 0, size: 20 });
// console.log("listTest", test?.errcode, test?.totalCount);

// 测试request方法级别的拦截器
// const test = await listTestMethodAOP({ offset: 0, size: 20 });
// console.log("listTestMethodAOP", test?.list, test?.errcode, test?.totalCount);
