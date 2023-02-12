/**
 * @Description: 实现哈希表
 * @Author: 小钦var
 * @Date: 2023/2/11 15:33
 */

export default class HashMap<T = any> {
  private storage: [string, T][][] = []; // 测试用，未加上private
  private loaderFactor = 0.75; // 装填因子
  private minFactor = 0.25; // 缩容因子
  private primeNum = 31; // 幂等(质数)
  private minLength = 17; // 最小长度
  private length = 17; // hashMap的数组长度
  private count = 0; // 元素个数
  constructor() {
    this.storage.length = this.length;
  }

  /**
   * 修改key对应的value，如果不存在即插入
   * @param key
   * @param value
   */
  put(key: string, value: T): void {
    const hashIndex = this.hashFunc(key);
    const bucket = this.storage[hashIndex];

    // 索引下bucket为undefined，创建一个空[]并push元素
    if (!bucket) {
      this.storage[hashIndex] = [];
      this.storage[hashIndex].push([key, value]);
      this.count++;
      this.resize();
      return;
    }

    // 索引下的bucket存在，修改相同key的元素
    for (let i = 0; i < bucket.length; i++) {
      const keyValueTuple = bucket[i];
      if (keyValueTuple[0] === key) {
        keyValueTuple[1] = value;
        this.count++;
        this.resize();
        return;
      }
    }

    // 如果没有成功修改，说明存在bucket但是没有添加过key，value
    bucket.push([key, value]);
    this.count++;
    this.resize();
  }

  /**
   * 根据key查询并返回value，不存在返回undefined
   * @param key
   */
  get(key: string): T | undefined {
    const hashIndex = this.hashFunc(key);
    const bucket = this.storage[hashIndex];

    if (!bucket) return;

    for (const kvTuple of bucket) {
      if (kvTuple[0] === key) return kvTuple[1];
    }
  }

  delete(key: string): T | undefined {
    const hashIndex = this.hashFunc(key);
    const bucket = this.storage[hashIndex];

    // 不存在桶，压根不存在删除的key，value
    if (!bucket) return;
    // 存在桶
    for (const [index, [k, value]] of bucket.entries()) {
      if (k === key) {
        bucket.splice(index, 1); // 删除原数组中的指定索引位置的元素
        this.count--;
        this.resize();
        return value;
      }
    }
    // 存在桶但是没有kv，默认返回undefined
  }

  /**
   * hashMap的数组长度
   */
  size(): number {
    return this.storage.length;
  }

  /**
   * 哈希函数
   * @param key 需要哈希化的字符串
   */
  private hashFunc(key: string): number {
    const strLen = key.length;
    let num = 0;
    for (let i = 0; i < strLen; i++) {
      num = num * this.primeNum + key.charCodeAt(i);
    }
    return num % this.length;
  }

  /**
   * 哈希表扩容操作
   * @private
   */
  private resize(): void {
    const factor = this.count / this.length;

    const enlargeOrShrink = (isEnlarge: boolean): void => {
      const oldStorage = this.storage;
      this.storage = [];
      if (isEnlarge) {
        let enlargeSize = Math.floor(this.length * 2);
        enlargeSize = this.nextPrime(enlargeSize);
        this.storage.length = enlargeSize;
      } else {
        let shrinkSize = Math.floor(this.length / 2);
        if (shrinkSize < this.minLength) {
          shrinkSize = this.minLength;
        } else {
          shrinkSize = this.nextPrime(shrinkSize);
        }
        this.storage.length = shrinkSize;
      }
      this.length = this.storage.length;
      for (const bucket of oldStorage) {
        if (!bucket) continue;
        for (const [key, value] of bucket) {
          const hashIndex = this.hashFunc(key);
          if (!this.storage[hashIndex]) this.storage[hashIndex] = [];
          this.storage[hashIndex].push([key, value]);
        }
      }
    };
    if (factor > this.loaderFactor) {
      // 扩容
      enlargeOrShrink(true);
      return;
    }

    // 缩容
    if (factor < this.minFactor && this.length > this.minLength) {
      enlargeOrShrink(false);
      return;
    }
  }

  /**
   * 根据传入数字
   * 如果是质数直接返回
   * 如果不是质数返回>num的质数
   * @param num
   * @private
   */
  private nextPrime(num: number): number {
    while (!this.isPrime(num)) {
      num++;
    }
    return num;
  }

  /**
   * 判断数字是否是质数
   * @param num
   * @private
   */
  private isPrime(num: number): boolean {
    if (num === 1 || num < 0) return false;
    const sqrt = Math.sqrt(num);
    for (let i = 2; i <= sqrt; i++) {
      if (num % i === 0) return false;
    }
    return true;
  }
}

function main() {
  const hashMap = new HashMap<string>();

  // 测试hash函数
  /*console.log(hashMap.hashFunc("你好"));
  console.log(hashMap.hashFunc("js"));
  console.log(hashMap.hashFunc("TS"));
  console.log(hashMap.hashFunc("node"));
  console.log(hashMap.hashFunc("nodejs"));
  console.log(hashMap.hashFunc("midway.js"));*/

  // 测试put、get方法
  console.log(" ========= put get方法测试 start =========");
  hashMap.put("name1", "xiaoqinvar");
  console.log(hashMap.size());
  hashMap.put("name1", "xqv");
  hashMap.put("name2", "jybill");
  hashMap.put("name3", "Test");
  hashMap.put("name4", "4");
  hashMap.put("name5", "5");
  hashMap.put("name6", "6");
  hashMap.put("name7", "7");
  hashMap.put("name8", "8");
  hashMap.put("name9", "9");
  hashMap.put("name10", "10");
  hashMap.put("name11", "11");
  hashMap.put("name12", "12");
  console.log(hashMap.size());
  console.log(hashMap.get("name1"));
  console.log(hashMap.get("name2"));
  console.log(hashMap.get("name3"));
  console.log(hashMap.get("name4"));
  console.log(" ========= put get方法测试 end =========");
  console.log(" ========= delete方法测试 start =========");
  console.log("get name1：", hashMap.get("name1"));
  console.log("delete name1: ", hashMap.delete("name1"));
  console.log("get name1：", hashMap.get("name1"));
  hashMap.delete("name2");
  hashMap.delete("name3");
  hashMap.delete("name4");
  hashMap.delete("name5");
  hashMap.delete("name6");
  console.log(hashMap.size());
  console.log(" ========= delete方法测试 end =========");
}

main();
