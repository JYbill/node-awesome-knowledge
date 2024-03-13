export function trace(target: any, key: string) {
  console.log("trace, key =", key, ", value =", target[key]);
}

export function trigger(target: any, key: string, value: any) {
  console.log("trigger", target, key, value);
}
