/**
 * @file: user.ts
 * @author: xiaoqinvar
 * @desc：user模块例子🌰
 * @date: 2022-10-29 12:35:23
 */
import Request from "../index";

export async function userInfo() {
  try {
    return await Request.get("/user/info");
  } catch (error: any) {
    console.error("user.ts#userInfo", error);
    return null;
  }
}
