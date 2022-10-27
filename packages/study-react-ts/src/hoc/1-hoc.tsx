import { FC } from "react";
import Son, { type ISon } from "./1-son";

const WithFunc = (Component: FC<ISon>, props: ISon) => {
  return <Component {...props} />;
};
export default WithFunc;
