import { list, listTest } from "./api/module/entire";
const listRes = await list({ offset: 0, size: 20 });
console.log("list", listRes);

const test = await listTest({ offset: 0, size: 20 });
console.log("listTest", test);
