import type { AxiosRequestConfig, CreateAxiosDefaults, AxiosResponse } from "axios";

/**
 * axios 错误接口
 */
export interface IAxiosError {
  code: string;
  config: AxiosRequestConfig;
  message: string;
  name: string;
  request: XMLHttpRequest;
  stack: string;
}

export interface AxiosConfig<D = any> extends CreateAxiosDefaults<D> {
  interceptor?: {
    reqSuccessHandler(config: AxiosRequestConfig): AxiosRequestConfig;
    reqFailHandler(error: IAxiosError): any;
    resSuccessHandler(res: AxiosResponse): any;
    resFailHandler(error: IAxiosError): any;
  };
}
