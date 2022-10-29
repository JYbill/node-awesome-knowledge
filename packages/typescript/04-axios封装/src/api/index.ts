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
const baiduRequest = new AxiosRequest({});

export default request;
export { baiduRequest };
