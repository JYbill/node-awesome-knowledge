"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file: 01-async.ts
 * @author: xiaoqinvar
 * @desc：事件驱动架构，使用node自带的events包，体验事件驱动！
 * @date: 2022-04-30 21:04:19
 */
const events_1 = __importDefault(require("events"));
const event = new events_1.default();
event.on('event', (num) => {
    console.log("event1.0", num);
});
event.on('event', (num) => {
    console.log("event1.1", num);
});
setTimeout(() => {
    event.emit('event', 8);
}, 0);
