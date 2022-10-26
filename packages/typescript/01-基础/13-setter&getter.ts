/**
 * @file: 13-setter&getter.ts
 * @author: xiaoqinvar
 * @desc：setter和getter
 * @date: 2022-10-21 19:51:12
 */
class Good {
  private _price: number;

  constructor(price: number) {
    this._price = price;
  }

  // 如果没有setter、getter是无法访问私有属性的
  get price() {
    return this.price;
  }
  set price(num: number) {
    this.price = num;
  }
}

const good = new Good(88);
good.price = 100; // 调用set price()
console.log(good.price); // 调用 get price()
