import React from "react";
import { Navbar } from "react-bootstrap";

export default function TopBar(props) {
  const { logo } = props;
  return (
    <Navbar
      sticky="top"
      className="justify-content-center"
      style={{
        background: "linear-gradient(black, transparent)",
      }}
    >
      <Navbar.Brand href="#" style={{ margin: 0 }}>
        <img src={logo} width="80rem" alt="logo" />
      </Navbar.Brand>
    </Navbar>
  );
}

export function Footer(props) {
  const { text } = props;
  return (
    <Navbar
      className="justify-content-start"
      style={{
        background: "linear-gradient(transparent, black)",
      }}
    >
      <Navbar.Brand>
        <h1 className="display-4" style={{ fontSize: "2rem", color: "white" }}>
          {text}
        </h1>
      </Navbar.Brand>
    </Navbar>
  );
}
