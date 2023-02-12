/**
 * @Description: 面试题：是否是质数
 * @Author: 小钦var
 * @Date: 2023/2/12 11:37
 */
function isPrime(num: number): boolean {
  if (num === 1 || num < 0) return false;
  const sqrt = Math.sqrt(num);
  for (let i = 2; i <= sqrt; i++) {
    if (num % i === 0) return false;
  }
  return true;
}

function main() {
  console.log(isPrime(1));
  console.log(isPrime(2));
  console.log(isPrime(3));
  console.log(isPrime(4));
  console.log(isPrime(5));
  console.log(isPrime(6));
  console.log(isPrime(31));
}
main();
export {};
