import { Read, Write } from "./operation";

export function trace(target: any, operation: Read, key: string) {
  if (operation === Read.ITERATE) {
    // ⚠️ ITERATE一般是循环，是没有key的
    console.log("trace", target);
    return;
  }
  console.log("trace", "key", key, "value =", target[key]);
}

export function trigger(
  target: any,
  operation: Write,
  key: string,
  value?: any
) {
  if (operation === Write.DELETE) {
    console.log("trigger", operation, target[key]);
    return;
  }
  console.log("trigger", operation, target[key], value);
}
