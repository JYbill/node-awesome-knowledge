import TableChild from "./01-son-fragments";

export default function Table() {
  return (
    <table border={1}>
      <thead>
        <tr>
          <td>表单头部</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <TableChild />
        </tr>
      </tbody>
    </table>
  );
}
