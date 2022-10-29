/**
 * @file: user.ts
 * @author: xiaoqinvar
 * @desc：user模块例子🌰
 * @date: 2022-10-29 12:35:23
 */
import Request from "../index";

export function userInfo() {
  return Request.get("/user/info").then((res) => {
    return res.data;
  });
}
