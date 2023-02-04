import ArrayStack from "./01.实现ArrayStack结构";

/**
 * @Description: 面试题：有效括号"{}", "[]", "()"
 * @Author: 小钦var
 * @Date: 2023/2/4 15:06
 */
function validateBracket(word: string): boolean {
  const arrayStack = new ArrayStack<string>();

  for (const char of word) {
    switch (char) {
      case "(":
        arrayStack.push(")");
        break;
      case "{":
        arrayStack.push("}");
        break;
      case "[":
        arrayStack.push("]");
        break;
      default:
        if (char !== arrayStack.pop()) return false;
    }
  }
  return arrayStack.isEmpty();
}

// 测试代码
console.log(validateBracket("()"));
console.log(validateBracket("(){}[]"));
console.log(validateBracket("[{()}]"));
console.log(validateBracket("(}")); // false正确
console.log(validateBracket("({})({")); // false
