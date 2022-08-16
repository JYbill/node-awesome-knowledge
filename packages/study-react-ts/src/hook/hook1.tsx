import { useState } from "react";

export default function HookFunc1() {
  const [count, setCount] = useState<number>(0);

  const btnClickFunc = () => {
    setCount(count + 1);
  };

  return (
    <>
      <p>hook1 function tsx. 🐒 say: `{count}`</p>
      <button onClick={btnClickFunc}>click monkey🐒</button>
    </>
  );
}
