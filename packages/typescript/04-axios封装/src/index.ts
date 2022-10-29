import { list } from "./api/module/entire";
const listRes = await list({ offset: 0, size: 20 });
console.log(listRes);
