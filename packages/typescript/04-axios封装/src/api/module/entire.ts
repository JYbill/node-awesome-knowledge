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
