class Core {
  instance = null;
  title = "博客";
  author = {
    uname: "xiaoqinvar.",
  };
  update() {
    this.title = "update title.";
    this.author.uname = "aka. xqv yo.";
  }

  /**
   * 单例模式判断
   * @returns Core
   */
  static init() {
    if (this.instance) {
      return this.instance;
    }
    return (this.instance = new Core());
  }
}
module.exports = Core;
