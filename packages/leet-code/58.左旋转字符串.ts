/**
 * @Description: 剑指Offer 58 左旋转字符串
 * @Author: 小钦var
 * @Date: 2023/9/12 11:11
 */
/**
 * 输入: s = "abcdefg", k = 2
 * 输出: "cdefgab"
 *
 * 输入: s = "lrloseumgh", k = 6
 * 输出: "umghlrlose"
 */
function reverseLeftWords(s: string, n: number): string {
  if (n > s.length) {
    throw TypeError("n参数不应该 > 字符串长度");
  }
  if (n === s.length) return s;
  for (let i = 0; i < n; i++) {
    s += s[i];
  }
  return s.slice(n);
}

function test() {
  const res1 = reverseLeftWords("abcdefg", 2);
  console.log(res1);

  const res2 = reverseLeftWords("lrloseumgh", 6);
  console.log(res2);
}
test();

export {};
