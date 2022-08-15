import React from "react";
import { Outlet } from "react-router-dom";

export default class Son1 extends React.Component {
  render(): React.ReactNode {
    return (
      <>
        <p style={{ color: "red" }}>im son1.</p>
        <hr />
      </>
    );
  }
}
