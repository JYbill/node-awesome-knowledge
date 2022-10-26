/**
 * @file: 15-抽象类.ts
 * @author: xiaoqinvar
 * @desc：抽象类
 * @date: 2022-10-21 22:11:17
 */
abstract class Animal {
  constructor(public name: string) {}
  abstract eat(): void; // 抽象类/方法: 一种标准, 不允许瞎写

  // 允许存在，但一般不会存在
  move() {
    return "moving";
  }
}

class Dog extends Animal {
  constructor(name: string) {
    super(name);
  }
  eat(): void {
    console.log(this.name + "吃骨头...");
  }
}

class Pig extends Animal {
  constructor(name: string) {
    super(name);
  }
  eat(): void {
    console.log(this.name + "吃猪食...");
  }
}

const a1: Animal = new Dog("小狗");
const a2: Animal = new Pig("小猪");
a1.eat(); // 小狗吃骨头...
a2.eat(); // 小猪吃猪食...
