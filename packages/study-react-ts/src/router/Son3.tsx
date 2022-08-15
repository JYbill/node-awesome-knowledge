import { useParams } from "react-router-dom";

export default function Son3() {
  const params = useParams();
  return <p>current number is {params.numberId}!</p>;
}
