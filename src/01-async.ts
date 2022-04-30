/**
 * @file: 01-async.ts
 * @author: xiaoqinvar
 * @desc：事件驱动架构，使用node自带的events包，体验事件驱动！
 * @date: 2022-04-30 21:04:19
 */
import EventEmitter from 'events';

const event = new EventEmitter();
event.on('event', (num: number) => {
  console.log("event1.0", num);
});

event.on('event', (num: number) => {
  console.log("event1.1", num);
});

setTimeout(() => {
  event.emit('event', 8);
}, 0);