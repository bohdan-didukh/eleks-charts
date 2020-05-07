import React, { useMemo } from "react";
import {
  VECTOR_HEIGHT,
  VECTOR_PADDING_RIGHT,
  VECTOR_WIDTH,
} from "../constants";

import styles from "./Vector.module.scss";

import { DONUT_COLOR_SET, DonutItem } from "../constants";
import { VectorItem } from "./VectorItem";
import { format } from "../utils";

export interface VectorChartProps {
  data: DonutItem[];
}
export const VectorChart: React.FC<VectorChartProps> = ({ data }) => {
  const total = useMemo(
    () => data.reduce((total, { value }) => value + total, 0),
    [data]
  );

  let startPercent = 0;

  return (
    <svg width={VECTOR_WIDTH + VECTOR_PADDING_RIGHT} height={VECTOR_HEIGHT}>
      <g transform="translate(0,15)">
        <text className={styles.total}>
          EUR {format(total)} billion signed in total
        </text>
      </g>
      <g transform="translate(0,34)">
        {data.map((item, index) => {
          const percent = Math.round((item.value / total) * 100) / 100;
          startPercent += percent;
          return (
            <VectorItem
              key={item.title}
              data={item}
              index={index}
              left={(startPercent - percent) * VECTOR_WIDTH}
              width={percent * VECTOR_WIDTH}
              percent={percent}
              fill={DONUT_COLOR_SET[index]}
            />
          );
        })}
      </g>
    </svg>
  );
};
