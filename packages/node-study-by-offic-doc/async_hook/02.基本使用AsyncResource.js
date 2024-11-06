const async_hooks = require("async_hooks");
const { AsyncResource } = require("async_hooks");

// 这是你的数据库查询功能的简化版本
class DatabaseQuery extends AsyncResource {
  constructor() {
    super("DB", { requireManualDestroy: true });
  }
  query(sql, callback) {
    this.fakeResult = "mock data ...";
    this.runInAsyncScope(callback, this, null, this.fakeResult);
  }

  close() {
    this.fakeResult = null;
    this.emitDestroy();
  }
}

// 创建一个hook，记录所有的异步事件
async_hooks.createHook({
  init(asyncId, type, triggerAsyncId) {
    process._rawDebug(`init --- type=${type} asyncId=${asyncId}`);
  },
  before(asyncId) {
    process._rawDebug(`before --- asyncId=${asyncId}`);
  },
  after(asyncId) {
    process._rawDebug(`after --- asyncId=${asyncId}`);
  },
  destroy(asyncId) {
    process._rawDebug(`destroy --- asyncId=${asyncId}`);
  },
}).enable()

// 使用你的数据库库
let dbQuery = new DatabaseQuery();
dbQuery.query("SELECT * FROM table", function (err, results) {
  if (err) throw new Error(err);
  process._rawDebug(`DB callback --- res:`, results);
  this.close();
});

// 测试垃圾回收问题
// for (let i = 0; i < 5000000000; i++) {}

