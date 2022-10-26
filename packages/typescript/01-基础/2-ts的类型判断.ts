function test() {}
export {};

// 常量进行类型推导默认为字面量
const height = 1.88; // height: 1.88
const hello = "hello"; // hello: "hello"
let age = 23; // age: number

// 对象类型
const info: {
  name: string;
  age: number;
} = {
  name: "xqv.",
  age: 23,
};

// never 测试
let symbolString1 = Symbol("hello");
let symbolString2 = Symbol("hello");
let testNever: never = (() => {
  // 方式1
  while (true) {}
  // 方式2
  // throw new Error();
  // 方式3
  // return []; // never[]
})();
let testNumber: number = testNever;
// testNever = ''; // ❌ never类型不允许被赋值

// unknown 测试
let testUnknown: unknown;
testUnknown = "str";
let testString: string;
// testString = testUnknown; // ❌ unknown类型只允许赋值给`any`类型
let testAny: any = testUnknown; // ✅
// testUnknown.length; // ❌ testUnknown无法进行任何操作
// 类型缩小
(testUnknown as string).toUpperCase();

let distance: number = 1.88;
let money: bigint = BigInt(1);
let say: string = "yo.";
let flag: boolean = true;
let symbolType: symbol = Symbol();
let n: null = null;
let u: undefined = undefined;
function voidFunc(): void {} // void 无返回值

function indent() {
  for (const item of [1, 2, 3]) {
    console.log(1);
    const obj = {
      test() {},
    };
  }
}

// void 应用场景
type TVoidFunc = () => void;
const voidFunction: TVoidFunc = () => {
  return Symbol("");
};

// never 的应用场景1
/* function util(value: string | number | boolean) {
  switch (typeof value) {
    case "string":
      console.log(value.toString());
      break;
    case "number":
      console.log(value + 1);
      break;
    default:
      // ❌ 报错，因为能进入这里的只有boolean类型，且没有case "boolean"类型；给其他开发者有一个错误提示，让他加上case "boolean"处理
      const neverVal: never = value;
  }
} */

// never 的应用场景2
/* type TCheckIsString<T> = T extends string ? T : never;
const str1: TCheckIsString<"hi."> = "hi.";
const str2: TCheckIsString<1> = "hi."; // ❌ never类型无法接受任何类型 */

// 元组类型应用场景
type TStateFunc<T> = (val: T) => void;
function useState<T>(value: T): [T, TStateFunc<T>] {
  let initVal = value;
  const setStateFunc: TStateFunc<T> = (setVal: T) => {
    initVal = setVal;
  };
  return [initVal, setStateFunc];
}
const [value, setStateFunc] = useState(10);
// value: number
// setStateFunc: TStateFunc<number>
