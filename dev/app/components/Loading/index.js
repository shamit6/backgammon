import React, { Component } from "react";

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  render() {
    const { loading } = this.state;

    return this.state.loading ? (
      <div>{this.props.message}</div>
    ) : (
      this.props.children
    );
  }
}

export default Loading;
