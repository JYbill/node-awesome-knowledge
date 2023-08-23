/**
 * @file: proxy.ts
 * @author: xiaoqinvar
 * @desc：代理模式
 * @date: 2022-09-16 22:12:43
 */
interface ICaclu {
  calculate(num1: number, num2: number): number;
}

class NPC1 implements ICaclu {
  calculate(num1: number, num2: number): number {
    return num1 + num2;
  }
}

class NPC2 implements ICaclu {
  calculate(num1: number, num2: number): number {
    return num1 * num2;
  }
}

class StaticProxy implements ICaclu {
  killer: ICaclu = new NPC1();
  calculate(num1: number, num2: number) {
    return this.killer.calculate(num1, num2);
  }
}
const sp = new StaticProxy();
console.log(sp.calculate(1, 2));

// 代理
class Proxy {
  killer: ICaclu | undefined;
  calculate(num1: number, num2: number) {
    return (this.killer as ICaclu).calculate(num1, num2);
  }
}
const proxy = new Proxy();
proxy.killer = new NPC2();
console.log(proxy.calculate(1, 2));
export {};
