import { useEffect, useState } from "react";

export function useLog() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log("current count number: ", count + 1);
    setCount(count + 1);
  });
  return count;
}
