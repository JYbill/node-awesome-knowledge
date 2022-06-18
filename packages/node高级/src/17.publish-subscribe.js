class PublishSubscribeModel {
  event = {};

  /**
   * 发布消息
   */
  publish(key, ...args) {
    const callbackArr = this.event[key];
    if (!callbackArr) {
      throw new Error(key, '该事件未订阅过');
    }

    // 执行订阅事件
    for (const callback of callbackArr) {
      callback.call(this, ...args);
    }
  }

  /**
   * 订阅消息
   */
  subscribe(key, callback) {
    const callbackArr = this.event[key];

    // 存在即添加回调函数
    if (callbackArr) {
      callbackArr.push(callback);
      return;
    }

    // 不存在创建
    this.event[key] = [callback];
  }
}

const e = new PublishSubscribeModel();
e.subscribe('key', (...args) => {
  console.log(args);
});
e.subscribe('key', (...args) => {
  console.log(args, 1);
})
e.publish('key', 1, 2, 3);
e.publish('key', 1, 2, 3);