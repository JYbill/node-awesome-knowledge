import { reactive } from "./reactive";
import { effect } from "./effect";
import {ref} from "./ref";
import {computed} from "./computed";

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
const num = ref(0);
const fullName = computed(() => {
  console.log("computed");
  return p.name + p.age;
})
console.log("res", fullName.value);
console.log("res", fullName.value);
console.log("res", fullName.value);
console.log("res", fullName.value);
p.age++;
p.age++;
p.age++;
console.log("-------")
console.log("res", fullName.value);
console.log("res", fullName.value);

