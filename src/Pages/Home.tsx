import React from "react";
import { Header } from "../component/Header";
import { Menu } from "../component/Menu";
const Home: React.FC<{}> = () => {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header></Header>
      <div
        style={{
          backgroundColor: "violet",
          flex: 1,
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
        }}
      >
        <Menu />
      </div>
    </div>
  );
};

export { Home };
