let name = "x";
let obj = {
  uname: "xiaoqinvar.",
};
export { name, obj };
export default { name, obj };
setTimeout(() => {
  name = "yo.";
  obj.uname = "aka";
}, 100);
