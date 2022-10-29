/**
 * @file: index.ts
 * @author: xiaoqinvar
 * @desc：封装axios实例
 * @date: 2022-10-29 12:04:11
 */
import axios from "axios";
import type { IAxiosError, AxiosConfig } from "./type";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export default class AxiosRequest {
  private instance: AxiosInstance;

  constructor(config: AxiosConfig<any>) {
    this.instance = axios.create(config);

    // 公共的拦截器
    const interceptors = this.instance.interceptors;
    // request interceptor
    interceptors.request.use(
      (config: AxiosRequestConfig<any>) => {
        // config AOP
        return config;
      },
      (requestErr: IAxiosError) => {
        throw requestErr;
      },
    );

    // response interceptor
    interceptors.response.use(
      (value: AxiosResponse<any, any>) => {
        // response success
        return value.data;
      },
      (responseErr: IAxiosError) => {
        // response error
        throw responseErr;
      },
    );

    // 自定义实例化时自定义的拦截器
    interceptors.request.use(
      config.interceptor?.reqSuccessHandler,
      config.interceptor?.reqFailHandler,
    );
    interceptors.response.use(
      config.interceptor?.resSuccessHandler,
      config.interceptor?.resFailHandler,
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
