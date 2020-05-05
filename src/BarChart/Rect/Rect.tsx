import * as d3 from "d3";
import React, { useMemo } from "react";

import { DARK_BLUE, IBarData } from "../../constants";
import { RECT_HEIGHT } from "../../constants";

import styles from "./Rect.module.scss";

const format = d3.format(".1f");

export interface IRect {
  data: IBarData;
  x: any;
  y: any;
}
export const Rect: React.FC<IRect> = ({
  data: { value, name, coFinanced },
  x,
  y,
}) => {
  const height = Math.min(RECT_HEIGHT, y.bandwidth());

  const percent = useMemo(() => (coFinanced / value) * 100, [
    coFinanced,
    value,
  ]);

  return (
    <g transform={`translate(0, ${y(name)})`}>
      <rect width={x(value)} height={height} fill={DARK_BLUE} />
      <text x={-10} y={height / 2} className={styles.name}>
        {name}
      </text>
      <text x={x(value) + 5} y={height / 2} className={styles.value}>
        €{format(value)}
      </text>
      <text x={5} y={-6} className={styles.coFinanced}>
        €{format(coFinanced)} ({format(percent)}%)
      </text>
    </g>
  );
};
