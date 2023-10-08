/**
 * @Description: 分支法：汉诺塔问题
 * @Author: 小钦var
 * @Date: 2023/10/8 10:08
 */
let count = 0;
function move(src: number[], tar: number[]): void {
  count++;
  const value = src.pop();
  if (!value) {
    throw new TypeError("src.pop()结果为空");
  }
  tar.push(value);
}

function dfs(n: number, src: number[], buf: number[], tar: number[]): void {
  // 当n为1时，代表只需要从src上移动到tar上
  if (n === 1) {
    move(src, tar);
    return;
  }
  // 子问题 f(i-1) ：将 src 顶部 i-1 个圆盘借助 tar 移到 buf
  dfs(n - 1, src, tar, buf);
  move(src, tar);
  dfs(n - 1, buf, src, tar);
}

function test() {
  const src = [1, 2, 3];
  dfs(src.length, src, [], []);
  console.log("移动次数", count);
}
test();

export {};
