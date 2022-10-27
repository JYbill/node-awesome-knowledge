import { FC } from "react";
import WithFunc from "./1-hoc";
import Son, { type ISon } from "./1-son";

const Father = () => {
  return WithFunc(Son, { age: 10 });
};

export default Father;
