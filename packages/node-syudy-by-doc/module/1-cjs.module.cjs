let name = "x";
let obj = {
  uname: "xiaoqinvar.",
};
module.exports = {
  name,
  obj,
};
setTimeout(() => {
  name = "yo.";
  obj.uname = "aka";
}, 100);