import Son1 from "./Son1";
import Son2 from "./Son2";
import { BrowserRouter, Route, Routes, Link, NavLink } from "react-router-dom";
import "./Router.scss";
import Son from "./Son";
import data from "../mock/data";
import Son3 from "./Son3";
import React from "react";

export default class RouterPage extends React.Component {
  isActive = ({ isActive }: { isActive: boolean }) => {
    // console.log(isActive);
    return isActive ? "active" : "";
  };

  state = {
    inputVal: "",
  };
  data = data;

  inputEvent = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    // console.log(target.value);
    this.setState({
      inputVal: target.value,
    });
  };

  render(): React.ReactNode {
    return (
      <BrowserRouter>
        {/* nav 高亮 link */}
        <NavLink
          to="/son3"
          style={{ marginRight: "20px" }}
          className={this.isActive}
        >
          发票连接
        </NavLink>
        {this.data.map((item) => {
          return (
            <NavLink
              style={{ display: "inline-block", marginRight: "20px" }}
              to={`/son3/${item.number}?name=${item.name}`}
              key={item.number}
            >
              {item.name}
            </NavLink>
          );
        })}
        <NavLink
          to="/son1"
          style={{ marginRight: "20px" }}
          className={this.isActive}
        >
          son1 href
        </NavLink>
        <NavLink to="/son2" className={this.isActive}>
          son2 href
        </NavLink>

        {/* Navigate */}
        {/* <Navigate to="child/son1" replace={false} /> */}
        {/* <input
          type="text"
          onInput={this.inputEvent}
          value={this.state.inputVal}
        />
        {this.state.inputVal === "son1" ? (
          <Navigate to="/child/son1" replace={true} />
        ) : (
          ""
        )} */}

        <Routes>
          <Route path="/" element={<Son />}>
            <Route path="son1" element={<Son1 />} />
            <Route path="son2" element={<Son2 />} />
            <Route path="son3">
              {/* 索引路由 */}
              <Route
                index
                element={
                  <main>
                    <p>im index router.</p>
                  </main>
                }
              />
              <Route path=":numberId" element={<Son3 />} />
            </Route>
          </Route>
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There`s nothing here!</p>
              </main>
            }
          />
        </Routes>
      </BrowserRouter>
    );
  }
}