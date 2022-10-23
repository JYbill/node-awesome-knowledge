/**
 * @file: 22-泛型.ts
 * @author: xiaoqinvar
 * @desc：泛型
 * @date: 2022-10-23 13:02:06
 */
// 泛型函数的运用, react useState模拟
/* type UseStateFuncType<T> = [T, (setValue: T) => void];
function useState<T>(arg: T): UseStateFuncType<T> {
  let value = arg;
  function setState(setValue: T) {
    value = setValue;
  }
  return [value, setState];
}
// number, (setValue: number) => void
const [count, setCount] = useState(1);
// string, (setValue: string) => void
const [str, setStr] = useState("");
// boolean, (setValue: boolean[]) => void
const [bool, setBool] = useState([true]); */

/**
 * 多个泛型参数
 */
/* function foo<T, E>(arg1: T, arg2: E): [T, E] {
  return [arg1, arg2];
}
// number, string
const [num, str] = foo(1, "hello"); */

/**
 * 泛型接口
 */
/* interface IPerson<T> {
  name: string;
  age: number;
  slogan: T;
}
const p1: IPerson<string> = {
  name: "xqv",
  age: 23,
  slogan: "hello.",
};
const p2: IPerson<boolean> = {
  name: "xqv",
  age: 23,
  slogan: true,
};
 */

/**
 * 泛型类
 */
/* class Point<T> {
  constructor(public x: T, public y: T) {}
}
// Point<number>
const p1 = new Point(10, 20);
// Point<string>
const p2 = new Point("10", "20"); */

/**
 * 接口、type的泛型函数的定义
 */
/* // 定义泛型函数类型
interface IFunc {
  <T>(arg: T): T;
}
type FuncType = <T>(arg: T) => T;

// 定义函数
const foo1: IFunc = function <T>(val: T) {
  return val;
};
const foo2: FuncType = function <T>(val: T) {
  return val;
};
// string
let data = foo1("hello ts");
data = foo2("hello ts"); */

/**
 * 泛型约束
 */
/* class Person {
  constructor(public name: string) {}
}
class Worker extends Person {
  constructor(public name: string, public job: string) {
    super(name);
  }
}
class Student {
  constructor() {}
}
class Doctor {
  constructor(public job: string) {}
}
type PersonType<T extends Person> = T;
const p: PersonType<Person> = new Person("xqv");
const worker: PersonType<Worker> = new Worker("xqv", "全栈");
// ❌ 根据鸭子类型检测，Student并不属于Person的子类，属性或行为必须包含父类的属性和行为且多余父类才算子类
const stu: PersonType<Student> = new Student("xqv", 23);
// ❌
const doctor: PersonType<Doctor> = new Doctor("院长"); */
export {};
