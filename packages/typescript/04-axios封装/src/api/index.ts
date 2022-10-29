/**
 * @file: index.ts
 * @author: xiaoqinvar
 * @desc：区分环境文件
 * @date: 2022-10-29 12:32:17
 */
import { BASE_UEL, DEV_URL, TIME_OUT } from "./config";
import AxiosRequest from "./request/index";

const prodRequest = new AxiosRequest({
  baseURL: BASE_UEL,
  timeout: TIME_OUT,
});

const devRequest = new AxiosRequest({
  baseURL: DEV_URL,
  timeout: TIME_OUT,
});

// 判断环境
let request = prodRequest;
const debug = true;
if (debug) {
  request = devRequest;
}
export default request;
