const obj = { name: "x" };
let name = "y";
module.exports = {
  name,
  obj,
  updName() {
    obj.name = "ha.";
  },
};
