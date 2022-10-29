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

  /**
   * 该方法AOP仅，请求成功通知、响应成功通知、响应失败通知有效
   * @param config 请求配置
   * @returns
   */
  async request<T = any, D = any>(config: AxiosConfig<D>) {
    const interceptor = config.interceptor;

    // 请求成功通知 AOP
    if (interceptor?.reqSuccessHandler) {
      config = interceptor.reqSuccessHandler(config);
    }

    // 网络请求
    let result: AxiosResponse<T, D>;
    try {
      result = await this.instance.request(config);

      // 响应成功通知 AOP
      if (interceptor?.resSuccessHandler) {
        result = interceptor.resSuccessHandler(result);
      }
      return result;
    } catch (err: any) {
      // 响应失败通知 AOP
      if (interceptor?.resFailHandler) {
        const errorRes = interceptor.resFailHandler(err);
        throw errorRes;
      }
    }
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
