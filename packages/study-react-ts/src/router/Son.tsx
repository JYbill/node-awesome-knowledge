import React from "react";
import { Outlet } from "react-router-dom";

export default class Son extends React.Component {
  render(): React.ReactNode {
    return (
      <div>
        <p style={{ border: "1px solid black" }}>im default son</p>
        <Outlet />
      </div>
    );
  }
}
