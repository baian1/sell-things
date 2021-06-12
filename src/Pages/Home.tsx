import React from "react";
import { CardList } from "../component/CardList";
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
          flex: 1,
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
        }}
      >
        <Menu />
        <div
          style={{
            flex: 1,
            backgroundColor: "tomato",
          }}
        ></div>
        <div
          style={{
            padding: "0 20px",
          }}
        >
          <CardList />
        </div>
      </div>
    </div>
  );
};

export { Home };
