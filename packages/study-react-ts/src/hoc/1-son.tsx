import { FC } from "react";

export interface ISon {
  age: number;
}
const Son: FC<ISon> = (props) => {
  return <div>{props.age}</div>;
};

export default Son;
