import React from "react";
import * as d3 from "d3";

import { Rect } from "./Rect";
import { BAR_DATA, VERTICAL_BAR_POSITION } from "../constants";
import styles from "./VerticalBar.module.scss";

export const VerticalBar: React.FC = () => {
  const data = BAR_DATA;
  const { top, left, right, bottom, width, height } = VERTICAL_BAR_POSITION;

  const x = d3
    .scaleBand()
    .range([0, width - left - right])
    .domain(data.map((d) => d.name))

    .padding(0.5);

  const lineTop = height - top - bottom;

  const y = d3
    .scaleLinear()
    .range([lineTop, 0])
    .domain([0, Math.max(...data.map(({ value }) => value))]);

  return (
    <>
      <svg width={width} height={height}>
        <g transform={`translate(${left}, ${top})`}>
          {data.map((data) => (
            <Rect key={data.name} data={data} x={x} y={y} lineTop={lineTop} />
          ))}
        </g>
        <line
          x1={0}
          x2={width}
          y1={lineTop + top}
          y2={lineTop + top}
          className={styles.line}
        />
      </svg>
    </>
  );
};
