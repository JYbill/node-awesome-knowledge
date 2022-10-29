/**
 * @file: index.ts
 * @author: xiaoqinvar
 * @desc：封装axios实例
 * @date: 2022-10-29 12:04:11
 */
import axios from "axios";
import type { AxiosInstance, CreateAxiosDefaults, AxiosRequestConfig, AxiosResponse } from "axios";

export default class AxiosRequest {
  private instance: AxiosInstance;

  constructor(config: CreateAxiosDefaults<any>) {
    this.instance = axios.create(config);

    // request interceptor
    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig<any>) => {
        // config AOP
        return config;
      },
      (requestErr: IAxiosError) => {
        throw requestErr;
      },
    );

    // response interceptor
    this.instance.interceptors.response.use(
      (value: AxiosResponse<any, any>) => {
        // response success
        return value.data;
      },
      (responseErr: IAxiosError) => {
        // response error
        throw responseErr;
      },
    );
  }

  request(config: AxiosRequestConfig<any>) {
    return this.instance.request(config);
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
