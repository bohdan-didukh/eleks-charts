import React from "react";
import "./App.css";
import { Donut } from "./Donut";
import { VerticalBar } from "./VerticalBar";
import { Footer } from "./Footer";
import { Eleks } from "./Eleks";
import { Details } from "./Details";

function App() {
  return (
    <div>
      <header>
        <main>
          <Eleks />
        </main>
      </header>
      <main>
        <Details />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Donut />
          <VerticalBar />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
