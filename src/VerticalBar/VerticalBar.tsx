import React from "react";
import * as d3 from "d3";
import { Rect } from "./Rect";
import { BAR_DATA, VERTICAL_BAR_POSITION } from "../constants";

export const VerticalBar: React.FC = () => {
  const data = BAR_DATA;
  const { top, left, right, bottom, width, height } = VERTICAL_BAR_POSITION;

  const x = d3
    .scaleBand()
    .range([0, width - left - right])
    .domain(data.map((d) => d.name))

    .padding(0.5);

  const y = d3
    .scaleLinear()
    .range([height - top - bottom, 0])
    .domain([0, Math.max(...data.map(({ value }) => value))]);

  return (
    <>
      <svg width={width} height={height}>
        <g transform={`translate(${left}, ${top})`}>
          {data.map((data) => (
            <Rect
              key={data.name}
              data={data}
              x={x}
              y={y}
              bottom={height - bottom - top}
            />
          ))}
        </g>
      </svg>
    </>
  );
};
