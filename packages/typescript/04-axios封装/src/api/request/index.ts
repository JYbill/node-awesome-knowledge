/**
 * @file: index.ts
 * @author: xiaoqinvar
 * @desc：封装axios实例
 * @date: 2022-10-29 12:04:11
 */
import axios from "axios";
import type { AxiosInstance, CreateAxiosDefaults, AxiosRequestConfig } from "axios";

export default class AxiosRequest {
  private instance: AxiosInstance;

  constructor(config: CreateAxiosDefaults<any>) {
    this.instance = axios.create(config);
  }

  get(url: string, config?: AxiosRequestConfig<any>) {
    return this.instance.get(url, config);
  }

  post(url: string, data?: any, config?: AxiosRequestConfig<any>) {
    return this.instance.post(url, data, config);
  }

  put(url: string, data?: any, config?: AxiosRequestConfig<any>) {
    return this.instance.post(url, data, config);
  }

  del(url: string, config?: AxiosRequestConfig<any>) {
    return this.instance.delete(url, config);
  }
}
