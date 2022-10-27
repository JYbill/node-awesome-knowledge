import React from "react";

/**
 * @file: 01-son-fragments.tsx
 * @author: xiaoqinvar
 * @desc：表单子内容
 * @date: 2022-10-26 16:49:58
 */
/* export default function TableChild() {
  return (
    <>
      <td>Hello</td>
      <td>World</td>
    </>
  );
} */

export default function TableChild() {
  return (
    <React.Fragment key={"id"}>
      <td>Hello</td>
      <td>World</td>
    </React.Fragment>
  );
}
