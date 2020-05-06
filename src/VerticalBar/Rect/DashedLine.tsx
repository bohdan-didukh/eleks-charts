import React from "react";

import styles from "./Rect.module.scss";
import { DASHED_SIZE } from "../../constants";

export interface IDashedLine {
  index: number;
  width: number;
  height: number;
}
export const DashedLine: React.FC<IDashedLine> = ({ index, width, height }) => {
  const space = DASHED_SIZE * 2 * 6;

  const x2 = index * DASHED_SIZE * 2;
  const x1 = x2;
  const y1 = (() => {
    const value = index * (DASHED_SIZE * 2);
    return Math.min(value, height);
  })();

  const y2 = (() => {
    if (x2 >= width) {
      return x2 - width;
    }
    return 0;
  })();

  return (
    <line
      x1={y1 < height ? 0 : x1 - space - DASHED_SIZE * 4}
      y1={y1}
      x2={y2 > 0 ? width : x2}
      y2={y2}
      className={styles.line}
      strokeWidth={DASHED_SIZE}
    />
  );
};
