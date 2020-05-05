import * as d3 from "d3";
import React, { useMemo } from "react";

import { IBarData } from "../../constants";
import { RECT_HEIGHT } from "../../constants";

import styles from "./Rect.module.scss";
import { ScaleBand, ScaleLinear } from "d3-scale";
import { DashedRect } from "./DashedRect";

const format = d3.format(".1f");

export interface IRect {
  data: IBarData;
  x: ScaleLinear<number, number>;
  y: ScaleBand<string>;
}
export const Rect: React.FC<IRect> = ({
  data: { value, name, coFinanced },
  x,
  y,
}) => {
  const height = Math.min(RECT_HEIGHT, y.bandwidth());
  const width = x(value);

  const percent = useMemo(() => coFinanced / value, [coFinanced, value]);

  return (
    <g transform={`translate(0, ${y(name)})`}>
      <rect width={width} height={height} className={styles.rect} />
      <DashedRect width={width * percent} height={height} />
      <text x={-10} y={height / 2} className={styles.name}>
        {name}
      </text>
      <text x={x(value) + 5} y={height / 2} className={styles.value}>
        €{format(value)}
      </text>
      <text x={5} y={-6} className={styles.coFinanced}>
        €{format(coFinanced)} ({format(percent * 100)}%)
      </text>
    </g>
  );
};
