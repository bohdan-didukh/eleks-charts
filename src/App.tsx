import React from "react";
import "./App.css";
import { Donut } from "./Donut";
import { Tooltip } from "./Tooltip";
import { Bar } from "./Bar";
import { VerticalBar } from "./VerticalBar";
const handleMove = ({
  pageX: left,
  pageY: top,
}: React.MouseEvent<HTMLDivElement>) => {
  const tooltip = new Tooltip();
  tooltip.set({ top, left });
};
function App() {
  return (
    <div className="App" onMouseMove={handleMove}>
      <section>
        <Donut />
      </section>
      <section>
        <VerticalBar />
      </section>
      <section>
        <Bar />
      </section>
    </div>
  );
}

export default App;
