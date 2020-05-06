import React, { useMemo } from "react";
import * as d3 from "d3";
import { ScaleBand, ScaleLinear } from "d3-scale";

import { IBarData, RECT_WIDTH } from "../../constants";

import styles from "./Rect.module.scss";

const format = d3.format(".1f");

export interface IRect {
  data: IBarData;
  y: ScaleLinear<number, number>;
  x: ScaleBand<string>;
  bottom: number;
}
export const Rect: React.FC<IRect> = ({
  data: { value, name, coFinanced },
  bottom,
  x,
  y,
}) => {
  const width = Math.min(x.bandwidth(), RECT_WIDTH);
  const height = bottom - y(value);

  const percent = useMemo(() => coFinanced / value, [coFinanced, value]);
  const coHeight = height * percent;
  const coTop = height - coHeight;
  const coLeft = RECT_WIDTH * 3;

  return (
    <g transform={`translate(${x(name)},${y(value)})`}>
      <rect width={width} height={height} className={styles.rect} />
      <rect
        className={styles.coFinanced}
        width={width}
        y={coTop}
        x={coLeft}
        height={coHeight}
      />
      <line
        className={styles.line}
        x1={RECT_WIDTH}
        y1={0.5}
        x2={RECT_WIDTH * 2}
        y2={0.5}
      />
      <line
        className={styles.line}
        x1={RECT_WIDTH * 4}
        y1={coTop + 0.5}
        x2={RECT_WIDTH * 5}
        y2={coTop + 0.5}
      />
      <text className={styles.value} x={RECT_WIDTH * 3}>
        {format(value)}
      </text>
      <text className={styles.value} x={coLeft + RECT_WIDTH * 3} y={coTop}>
        <tspan>{format(coFinanced)} - </tspan>
        <tspan className={styles.percent}>{format(percent * 100)}%</tspan>
      </text>
    </g>
  );
};
