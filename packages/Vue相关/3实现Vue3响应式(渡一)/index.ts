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
let person = reactive<PersonType>({
  name: "xiaoqinvar",
  age: 23,
  get username() {
    return this.name + this.age;
  },
  set username(name) {
    console.log(1);
  },
  test: {
    hobbies: "爱好",
  },
  del: true,
});

function running() {
  console.log("running", (person.del = true));
}
running();
