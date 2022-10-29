/**
 * @file: entire.ts
 * @author: xiaoqinvar
 * @desc：entire 接口例子🌰
 * @date: 2022-10-29 13:04:43
 */
import Request, { BaiduRequest } from "../index";

interface IList {
  offset: number;
  size: number;
}
export async function list(listParam: IList) {
  try {
    return await Request.get("/entire/list", {
      params: listParam,
    });
  } catch (error: any) {
    console.error("entries.ts#list", error);
    return null;
  }
}

export async function listTest(listParam: IList) {
  try {
    return await BaiduRequest.get("/entire/list", {
      params: listParam,
    });
  } catch (error: any) {
    console.error("entries.ts#listTest", error);
    return null;
  }
}

export async function listTestMethodAOP(listParam: IList) {
  try {
    return await Request.request({
      url: "/entire/list",
      params: listParam,
      interceptor: {
        reqSuccessHandler(config) {
          console.log("方法级别请求成功拦截器");
          return config;
        },
        resSuccessHandler(res) {
          console.log("方法级别响应成功拦截器");
          return res;
        },
        resFailHandler(error) {
          console.log("方法级别响应失败拦截器");
          return error;
        },
      },
    });
  } catch (error: any) {
    console.error("entries.ts#listTest", error);
    return null;
  }
}
