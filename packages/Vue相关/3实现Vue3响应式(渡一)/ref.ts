import {trace, trigger} from "./effect";
import {Read, Write} from "./operation";

/**
 * 实现ref函数
 * @param value
 */
export function ref(value: any) {
  return {
    get value() {
      trace(this, Read.GET, "value");
      return value;
    },
    set value(newer: any) {
      value = newer;
      trigger(this, Write.SET, "value", newer);
    },
  }
}
