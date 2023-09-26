class BasicPlugin {
  pluginName = "BasicPlugin";

  // 在构造函数中获取用户给该插件传入的配置
  constructor(options) {
    console.log("init", options);
  }

  // Webpack 会调用实例的 apply 方法给插件实例传入 compiler 对象
  apply(compiler) {
    // 监听BasicPlugin的事件
    compiler.hooks.run.tap(this.pluginName, function (compilation) {
      console.log("BasicPlugin 插件");
    });

    let startTime = 0;
    compiler.hooks.run.tap("compile", function (compilation) {
      startTime = Date.now();
    });
    compiler.hooks.run.tap("done", function (compilation) {
      console.log("执行时间", Date.now() - startTime, "ms");
    });
  }
}

module.exports = BasicPlugin;
