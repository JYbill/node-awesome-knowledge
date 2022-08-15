import React from "react";

export default class Login extends React.Component {
  render(): React.ReactNode {
    return (
      <div className="login">
        <form>
          <label htmlFor="username">
            <span>username</span>
          </label>
          <input id="username" type="text" />
        </form>
      </div>
    );
  }
}
