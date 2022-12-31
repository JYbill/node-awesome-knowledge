const obj = {
  uname: "xqv",
};
export default obj;

setImmediate(() => {
  obj.uname = "upd.";
});
