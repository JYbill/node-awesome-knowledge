import { reactive } from "./reactive";
import { effect } from "./effect";

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
const p = reactive(person);

function running() {
  function fn() {
    if (p.age >= 18) {
      console.log(p.name);
    } else {
      console.log(p.del);
    }
  }
  fn();
}
effect(running);
