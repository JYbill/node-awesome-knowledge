function log() {
  console.log("hello webpack");
}

function showNum(n) {
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
