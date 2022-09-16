/**
 * @file: single.ts
 * @author: xiaoqinvar
 * @desc：单例模式
 * @date: 2022-09-16 22:01:15
 */
// 饿汉模式
class SoundManager1 {
  static Instance: SoundManager1 = new SoundManager1();
}
console.log(SoundManager1.Instance === SoundManager1.Instance); // true

// 懒汉模式
class SoundManager2 {
  static #Instance: SoundManager2 | undefined;
  static init() {
    if (!this.#Instance) {
      this.#Instance = new SoundManager2();
    }
    return this.#Instance;
  }
}
console.log(SoundManager1.Instance === SoundManager1.Instance); // true
