import { useEffect, useState } from "react";
import { useLog } from "./log.hook";

export default function HookFunc1() {
  const [count, setCount] = useState<number>(0);

  const btnClickFunc = () => {
    setCount(count + 1);
  };

  console.log("init.");
  useEffect(() => {
    console.log("mounted/updated.");
    return () => {
      console.log("clear.");
    };
  }, []);

  return (
    <>
      <p>hook1 function tsx. 🐒 say: `{count}`</p>
      <button onClick={btnClickFunc}>click monkey🐒</button>
    </>
  );
}
