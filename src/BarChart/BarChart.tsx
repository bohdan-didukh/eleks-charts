import React from "react";
import * as d3 from "d3";
import { Rect } from "./Rect";
import { IBarChart } from "../constants";

export const BarChart: React.FC<IBarChart> = (props) => {
  const { data, top, left, right, bottom, width, height } = props;
  const x = d3
    .scaleLinear()
    .range([0, width - left - right])
    .domain([0, Math.max(...data.map(({ value }) => value))]);

  const y = d3
    .scaleBand()
    .range([height - top - bottom, 0])
    .domain(data.map((d) => d.name))
    .padding(0.1);

  return (
    <>
      <svg width={width} height={height}>
        <g transform={`translate(${props.left}, ${props.top})`}>
          {data.map((data) => (
            <Rect key={data.name} data={data} x={x} y={y} />
          ))}
        </g>
      </svg>
    </>
  );
};
