import { reactive } from "./reactive";

type PersonType = {
  name: string;
  age: number;
  username: string;
  test: {
    hobbies: string;
  };
  del?: boolean;
  unExit?: boolean;
};
const person: PersonType = {
  name: "xiaoqinvar",
  age: 23,
  get username() {
    return this.name + this.age;
  },
  test: {
    hobbies: "爱好",
  },
  del: true,
};
const obj = [1, person, 3, 4];
let objProxy = reactive(obj);

function running() {
  console.log("查找数组对象", objProxy.includes(person));
}
running();
