/**
 * @Description: 操作类型字面量的枚举
 * @Author: 小钦var
 * @Date: 2024/3/14 17:31
 */
export enum Read {
  GET = "get",
  IN = "in",
  ITERATE = "iterate",
}

export enum Write {
  SET = "set",
  ADD = "add",
  DELETE = "delete",
}

/**
 * 写入操作对应读取操作类型映射
 */
export const Write2Read = {
  [Write.SET]: [Read.GET, Read.IN],
  [Write.ADD]: [Read.GET, Read.IN, Read.ITERATE],
  [Write.DELETE]: [Read.GET, Read.IN, Read.ITERATE],
};
