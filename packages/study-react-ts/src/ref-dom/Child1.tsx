import React from "react";

interface Props {
  myRef?: React.RefObject<HTMLElement>;
}

export default class Child1 extends React.Component {
  el;
  constructor(props: Props) {
    super(props);

    this.el = React.createRef<HTMLInputElement>();

    // this指向
    this.getCurrent = this.getCurrent.bind(this);
  }

  getCurrent() {
    const current = this.el.current;
    console.log(current);
    current?.focus();
  }

  render() {
    // const { myRef } = this.props;
    return (
      <div className="Child1">
        <input ref={this.el} />
        <button onClick={this.getCurrent}>👍</button>
      </div>
    );
  }
}
