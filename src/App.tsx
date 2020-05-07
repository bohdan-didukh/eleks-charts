import React from "react";
import "./App.css";
import { Donut } from "./Donut";
import { VerticalBar } from "./VerticalBar";
import { Footer } from "./Footer";

function App() {
  return (
    <div>
      <main>
        <div className="charts">
          <Donut />
          <VerticalBar />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
