import React, { Component } from "react";
import Navbar from "./Navbar";

class Layout extends Component {
  render() {
    const { children } = this.props;
    return (
      <div className="overflow-hidden relative w-full min-h-screen">
        <Navbar />
        <div className="max-w-screen-lg mx-auto">{children}</div>
      </div>
    );
  }
}

export default Layout;
