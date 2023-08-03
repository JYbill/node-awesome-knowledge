/**
 * @Description: pinyin第三方库测试
 * @Author: 小钦var
 * @Date: 2023/8/3 09:40
 */
const { pinyin } = require("pinyin-pro");

/**
 *
 * @type {string[]}
 */
const res = pinyin("敖阜我very喜欢你", {
  mode: "surname", // 姓氏模式
  // pattern: "final", // 取消拼音首字母
  toneType: "none", // 取消音调
  type: "array", // 首字母
});
const name = res.reduce((prev, current) => {
  const firstUpper = current[0].toUpperCase();
  return prev + firstUpper + current.slice(1);
}, "");
console.log("pinyin：", name);

/**
 * 姓氏模式
 */
/*res = pinyin("曾小贤", {
  //   mode: "surname", // 姓氏模式
});
console.log("曾小贤", res); // zeng xiao xian*/
