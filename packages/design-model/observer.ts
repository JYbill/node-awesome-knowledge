interface IObserver {
  changedName(name: string): void;
}

class Person {
  #name = '';

  // 观察者容器
  #continer: IObserver[] = [];

  /**
   * 添加观察者
   * @param observer
   */
  add(observer: IObserver) {
    this.#continer.push(observer);
  }

  get name() {
    return this.#name;
  }

  set name(name: string) {
    this.#name = name;
    this.#continer.forEach((item) => item.changedName.call(null, this.#name));
  }
}

class Test implements IObserver {
  changedName(name: string): void {
    console.log('test say: i get it. name: ' + name);
  }
}

const person = new Person();
const test = new Test();
person.add(test);
person.name = 'xiaoqinvar.';
