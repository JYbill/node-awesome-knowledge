/**
 * @file: memory.listener.ts
 * @author: xiaoqinvar
 * @desc：数据订阅
 * @date: 2022-07-28 19:37:12
 */
import { Provide, Scope, ScopeEnum } from '@midwayjs/decorator';
import { DataListener } from '@midwayjs/core';

@Provide()
@Scope(ScopeEnum.Singleton) // 一般数据订阅类为单例
export class MemoryDataListener extends DataListener<string> {
  // 初始化数据
  initData() {
    return 'hello' + Date.now();
  }

  // 更新数据
  onData(setData) {
    setInterval(() => {
      setData('hello' + Date.now());
    }, 1000);
  }
}
