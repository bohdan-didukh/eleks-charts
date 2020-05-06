import React from "react";
import "./App.css";
import { Donut } from "./Donut";
import { Tooltip } from "./Tooltip";
import { Bar } from "./Bar";
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
      <Donut />
      <Bar />
    </div>
  );
}

export default App;
