import React, { useMemo } from "react";

import { IBarData, RECT_WIDTH } from "../../constants";

import styles from "./Rect.module.scss";
import { ScaleBand, ScaleLinear } from "d3-scale";

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
  const coFinancedHeight = height * percent;

  return (
    <g transform={`translate(${x(name)},${y(value)})`}>
      <rect width={width} height={height} className={styles.rect} />
      <rect
        width={width}
        y={height - coFinancedHeight}
        x={RECT_WIDTH * 3}
        height={coFinancedHeight}
        className={styles.coFinanced}
      />
    </g>
  );
};
