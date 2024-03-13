import { reactive } from "./reactive";

let person = reactive({
  name: "xiaoqinvar",
  age: 23,
  get username() {
    return this.name + this.age;
  },
  test: {
    hobbies: "爱好",
  },
});

function running() {
  console.log("running", person.test.hobbies);
}
running();
