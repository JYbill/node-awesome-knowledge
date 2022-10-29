/**
 * @file: index.ts
 * @author: xiaoqinvar
 * @desc：区分环境文件
 * @date: 2022-10-29 12:32:17
 */
import { BASE_UEL, DEV_URL, TIME_OUT } from "./config";
import AxiosRequest from "./request/index";

// 判断环境
let request = new AxiosRequest({
  baseURL: BASE_UEL,
  timeout: TIME_OUT,
});
const debug = false;
if (debug) {
  request = new AxiosRequest({
    baseURL: DEV_URL,
    timeout: TIME_OUT,
  });
}

// 其他接口
const BaiduRequest = new AxiosRequest({
  baseURL: BASE_UEL,
  timeout: TIME_OUT,
  interceptor: {
    // 注意这里的拦截器有顺序：响应成功公共拦截器 -> 响应成功自定义拦截器
    resSuccessHandler(res) {
      console.log("自定义成功拦截器测试");
      return res;
    },
    resFailHandler(error) {
      console.log("自定义失败拦截器测试");
      throw error;
    },
  },
});

export default request;
export { BaiduRequest };
