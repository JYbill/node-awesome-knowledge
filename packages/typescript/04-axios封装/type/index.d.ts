/**
 * axios 错误接口
 */
declare interface IAxiosError {
  code: string;
  config: AxiosRequestConfig;
  message: string;
  name: string;
  request: XMLHttpRequest;
  stack: string;
}
