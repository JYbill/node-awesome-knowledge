function lengthOfLongestSubstring(s: string): number {
  let maxStr: string = '';
  let maxStrArr: string[] = [];
  for (let index = 0; index <= s.length - 1; index++) {
    // status
    const char: string = s[index];
    const findIndex: number = maxStrArr.indexOf(char);

    // 校验
    if (findIndex >= 0) {
      const strArr: string[] = [];
      // console.log('findIndex', findIndex);
      // console.log('maxStrArr', maxStrArr);
      const str = maxStrArr.join('');
      maxStr = str.length >= maxStr.length ? str : maxStr;
      // console.log('maxStrArr.length', maxStrArr.length - 1);
      // console.log('findIndex + 1', findIndex + 1);
      for (let i = findIndex + 1; i <= maxStrArr.length - 1; i++) {
        // console.log('item', maxStrArr[i]);
        strArr.push(maxStrArr[i]);
      }
      // console.log('strArr', strArr);
      maxStrArr = strArr;
    }
    maxStrArr.push(char);
    // console.log('maxStrArr', maxStrArr);
    // console.log('maxStr', maxStr);
    // console.log('maxStr length', maxStr.length);
  }
  const str = maxStrArr.join('');
  maxStr = str.length >= maxStr.length ? str : maxStr;
  // console.log('maxStrArr', maxStrArr);
  // console.log('maxStr', maxStr);
  return maxStr.length;
}
// const result = lengthOfLongestSubstring('aab');
// const result = lengthOfLongestSubstring(' ');
const result = lengthOfLongestSubstring('dvdf');
console.log('result: ', result);
