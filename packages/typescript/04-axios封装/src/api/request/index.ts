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
  async request<T = any, C = any>(config: AxiosConfig<T, C>) {
    const interceptor = config.interceptor;

    // 请求成功通知 AOP
    if (interceptor?.reqSuccessHandler) {
      config = interceptor.reqSuccessHandler(config);
    }

    // 网络请求
    let result: T;
    try {
      result = await this.instance.request<any, T>(config);

      // 响应成功通知 AOP
      if (interceptor?.resSuccessHandler) {
        result = interceptor.resSuccessHandler(result);
      }
      return result;
    } catch (err: unknown) {
      // 响应失败通知 AOP
      if (interceptor?.resFailHandler) {
        const errorRes = interceptor.resFailHandler(<IAxiosError>err);
        throw errorRes;
      }
      throw err;
    }
  }

  get<T = any>(url: string, config?: AxiosConfig<T>) {
    return this.instance.get<any, T>(url, config);
  }

  post<T = any>(url: string, data?: any, config?: AxiosConfig<T>) {
    return this.instance.post<any, T>(url, data, config);
  }

  /**
   * 完整的更新一个资源
   * @param url
   * @param data
   * @param config
   * @returns
   */
  put<T = any>(url: string, data?: any, config?: AxiosConfig<T>) {
    return this.instance.post<any, T>(url, data, config);
  }

  /**
   * 更新资源的一部分
   * @param url
   * @param data
   * @param config
   * @returns
   */
  patch<T = any>(url: string, data?: any, config?: AxiosConfig<T>) {
    return this.instance.patch<any, T>(url, data, config);
  }

  del<T = any>(url: string, config?: AxiosConfig<T>) {
    return this.instance.delete<any, T>(url, config);
  }
}
