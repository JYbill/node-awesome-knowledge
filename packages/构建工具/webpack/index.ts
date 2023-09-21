function log() {
  console.log(import.meta.webpack);
}

function showNum(n: number) {
  return n;
}

require("./index.css");
log();

export default {
  log,
};
export const exportObj = {
  showNum,
};
