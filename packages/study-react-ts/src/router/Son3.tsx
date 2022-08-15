import { useNavigate, useParams, useSearchParams } from "react-router-dom";

export default function Son3() {
  const params = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <>
      <p>current number is {params.numberId}!</p>
      <span>query: </span>
      {searchParams.get("name")}
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        back2index
      </button>
    </>
  );
}
