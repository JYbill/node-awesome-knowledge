/**
 * @file: 19.event-implement.js
 * @author: xiaoqinvar
 * @desc：EventEmitter简单实现
 * @date: 2022-06-19 10:36:58
 */
class EventEmitter {
  events = {};

  // 订阅事件
  on(type, callback) {
    const event = this.events[type];

    if (!event) {
      this.events[type] = callback;
    } else if (typeof event === 'function') {
      this.events[type] = [event, callback];
    } else {
      event.push(callback);
    }
  }

  // 取消订阅
  off(type, callback) {
    const events = this.events[type];

    if (!events) { return; }

    // 一个回调情况
    if (typeof events === 'function' &&
      (events === callback || events.link === callback)
    ) {
      this.events[type] = null;
      return;
    }

    // 多个回调情况
    // console.log('debug events start', this.events);
    this.events[type] = events.filter((item) => {
      // console.log(item, callback, item === callback, item.link === callback.link);
      return item !== callback && item.link !== callback;
    });
    // console.log('debug events end', this.events);
  }

  // 发布事件
  emit(type, ...args) {
    const event = this.events[type];
    if (!event) {
      return
    } else if (typeof event === 'function') {
      event.call(this, ...args);
    } else {
      for (const callback of event) {
        callback.call(this, ...args);
      }
    }
  }

  // 触发一次即取消
  once(type, callback) {

    // aop静态代理 调用一次后利用闭包直接off删除
    const offBack = (...args) => {
      callback.call(this, ...args);
      this.off(type, offBack);
    }
    offBack.link = callback;
    this.on(type, offBack);
  }
}

const e = new EventEmitter();
// 测试订阅、发布 ✅
/* e.on('test', (...args) => {
  console.log('1', args);
});
e.on('test', (...args) => {
  console.log('2', args);
});
e.emit('test', 1, 2, 3);
e.emit('test', 1, 2, 4); */

// 测试取消订阅
/* const func = (...args) => {
  console.log('1', args);
};
e.on('test', func);
e.on('test', (...args) => {
  console.log('2', args);
});
e.off('test', func);
e.emit('test', 1, 2, 3);
e.emit('test', 1, 2, 4); */

// 测试once
/* const func = (...args) => {
  console.log('1', args);
};
e.once('test', func);
e.emit('test', 1, 2, 3);
e.emit('test', 1, 2, 4); */

// 测试once + off 发布订阅
const func = (...args) => {
  console.log('1', args);
};
e.once('test', func);
e.on('test', () => {
  console.log('yo.');
})
e.off('test', func);
e.emit('test', 1, 2, 3);
