import Table from "./fragments/01-father-fragments";
import Father from "./hoc/1-father";
import WithFunc from "./hoc/1-hoc";
import Son from "./hoc/1-son";

export default function App() {
  return (
    <div className="App">
      {/* {"Fragments"}
      <Table />
      <hr /> */}

      {"HOC"}
      <Son age={1} />
      <Father />
      <hr />
    </div>
  );
}
