/**
 * 判断两个基本属性或引用是否相等
 * @param newer
 * @param older
 */
export function hasChanged(newer: any, older: any) {
  // ⚠️ 这里必须用Object.is()而不是全等(===)
  // 因为，+0、-0这种奇葩情况全等是错误的，1 / -0 = -Infinity，1 / +0 = +Infinity。但是Object.is()可以很好的帮我们解决这些奇葩问题
  // +0 === -0 -> true
  // Object.is(+0, -0) -> false
  return !Object.is(newer, older);
}
