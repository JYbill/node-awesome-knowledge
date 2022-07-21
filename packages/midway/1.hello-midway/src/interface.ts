/**
 * @description User-Service parameters
 */
export interface IUserOptions {
  uid: number;
}

/**
 * user参数
 */
export interface User {
  username: string;
  age: number;
  id: number;
}

/**
 * 动态函数 + 工厂模式接口
 */
export interface IFactoryService {
  name: string;
  getData(): any;
}
