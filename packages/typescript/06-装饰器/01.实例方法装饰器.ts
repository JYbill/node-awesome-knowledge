/**
 * @Description: class实例方法装饰器
 * @Author: 小钦var
 * @Date: 2023/3/18 11:27
 */
export default class Person {
  constructor(public name: string) {}

  @logger // AOP
  say(word: string) {
    console.log("say: ", word);
    return word;
  }

  @logger // AOP
  static talk(word: string) {
    console.log("say: ", word);
    return word;
  }

  @bindThis
  lookThis() {
    console.log("指向：", this);
  }

  noBindLookThis() {
    console.log("未绑定指向", this);
  }

  @CustomLogger("xiaoqinvar Logger")
  do(studyType: string) {
    console.log("我是do内容", studyType);
    return studyType + 1;
  }
}

/**
 * @param originMethod 原始方法
 * @param _ctx 该方法的上下文信息：类型、方法名、是否是私有方法...
 */
function logger(originMethod: any, _ctx: ClassMethodDecoratorContext) {
  return function (this: any, ...args: any[]) {
    console.log("LOGGER: before");
    console.log("this", this);
    console.log("args", args);
    const res = originMethod.call(undefined, "哈哈");
    console.log("res", res);
    console.log("LOGGER: after");
    return res;
  };
}

function bindThis(originMethod: any, _ctx: ClassMethodDecoratorContext) {
  const methodName = _ctx.name;
  // ⚠️ 它会在其他字段初始化之前添加逻辑
  _ctx.addInitializer(function (this: any) {
    this[methodName] = this[methodName].bind(this);
  });
}

function CustomLogger(prefix = "LOGGER") {
  return function (originMethod: any, _ctx: ClassMethodDecoratorContext) {
    return function (this: any, ...args: any[]) {
      console.log(`${prefix}: before`);
      const res = originMethod.call(this, ...args);
      console.log(`${prefix}: res ${res}`);
      console.log(`${prefix}: after`);
      return res;
    };
  };
}

function main() {
  /* 实例方法 */
  // const person = new Person("xqv");
  // person.say("test");
  /* 静态方法 */
  // Person.talk("测试");
  /* ctx上下文的addInitializer方法 */
  // const person = new Person("小青蛙");
  // const look = person.lookThis;
  // look(); // Person { ... }
  // const noBindLook = person.noBindLookThis;
  // noBindLook(); // undefined
  /* 构造器函数 */
  // const person = new Person("");
  // person.do("学习ts5");
  // xiaoqinvar Logger: before
  // 我是do内容 学习ts5
  // xiaoqinvar Logger: res 学习ts51
  // xiaoqinvar Logger: after
}
main();
