import React, { useMemo } from "react";

import styles from "./Rect.module.scss";
import { DASHED_SIZE } from "../../constants";
import { DashedLine } from "./DashedLine";

export interface IDashedRect {
  width: number;
  height: number;
}

export const DashedRect: React.FC<IDashedRect> = ({ width, height }) => {
  const lines = useMemo(
    () =>
      Array.from(
        Array(Math.floor((width + height) / (DASHED_SIZE * 2))),
        (item, index) => index + 1
      ),
    [width, height]
  );

  return (
    <g className={styles.dashed} width={width} height={height}>
      <rect width={width} height={height} className={styles.rectDashed} />
      {lines.map((index) => (
        <DashedLine index={index} width={width} height={height} key={index} />
      ))}
    </g>
  );
};
