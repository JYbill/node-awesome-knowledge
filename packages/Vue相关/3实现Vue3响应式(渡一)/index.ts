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
  arr: number[];
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
  arr: [1, 2, 3],
};
const p = reactive(person);

function running() {
  function fn() {
    console.log("running");
    effect(() => {
      console.log("inner");
      p.name;
    });
    p.age;
  }
  fn();
}
effect(running);
console.log(" --- ");
// p.name = "test";
p.age = 10;
