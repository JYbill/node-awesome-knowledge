export function save(): void {
  console.log("save");
}

export function shaking(): void {
  console.log("shaking");
}

export const MY_NAME: string = "xiaoqinvar";

import("lodash/array.js").then((arr) => {
  console.log(arr);
});
