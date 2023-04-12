import Observers, { autorun } from "./vue.js";

const person = {
  name: "小青蛙",
  age: 18,
};
window["person"] = person;
Observers(person);

function firstName() {
  let name = "";
  if (person.name) {
    console.log(person);
    name = person.name[0];
  }
  document.querySelector(".first-name").innerHTML = name;
}

function lastName() {
  let name = "";
  if (person.name) {
    name = person.name.slice(1);
  }
  document.querySelector(".last-name").innerHTML = name;
}

function setAge() {
  let age = "";
  if (person.age) {
    age = person.age;
  }
  document.querySelector(".age").innerHTML = age;
}

autorun(firstName);
autorun(lastName);
autorun(setAge);
