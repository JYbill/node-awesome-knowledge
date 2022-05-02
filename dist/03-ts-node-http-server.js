"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file: 03-ts-node-http-server.ts
 * @author: xiaoqinvar
 * @desc：ts + node 开发http server服务
 * @date: 2022-05-02 13:41:10
 */
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.json({ name: 'xiaoqinvar', age: 23, job: 'node全栈开发工程师🥸' });
});
app.listen(3000, () => {
    console.log("app is running in http://localhost:3000 port.");
});
