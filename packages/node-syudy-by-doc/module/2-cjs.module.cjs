const obj = {
  uname: "xqv",
};
let name = "name";
module.exports = {
  name,
  obj,
};

setTimeout(() => {
  // name = "yo.";
  obj.age = 22;
}, 100);
