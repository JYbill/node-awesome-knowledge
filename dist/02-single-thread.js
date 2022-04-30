"use strict";
/**
 * @file: 02-single-thread.ts
 * @author: xiaoqinvar
 * @desc：nodejs单线程的缺点：不适合cpu密集型任务，也就是不适合同步代码过多的场景
 * @date: 2022-04-30 20:58:25
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
// 堵塞代码
function spendTime(second) {
    const time = Date.now() + second * 1000;
    while (Date.now() < time) { }
}
spendTime(3);
// 3s后才能开启服务
http_1.default.createServer().listen(3000, () => {
    console.log('server lisente ::3000 port 😃.');
});
