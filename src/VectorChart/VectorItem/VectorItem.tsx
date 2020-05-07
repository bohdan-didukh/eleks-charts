import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

import { DonutItem, VECTOR_LINE_HEIGHT } from "../../constants";
import styles from "./VectorItem.module.scss";
import { format0, wrap } from "../../utils";

export interface VectorItemProps {
  data: DonutItem;
  index: number;
  left: number;
  width: number;
  percent: number;
  fill: string;
}
export const VectorItem: React.FC<VectorItemProps> = ({
  data: { title },
  left,
  width,
  percent,
  fill,
}) => {
  const titleRef = useRef(null);

  useEffect(() => {
    d3.select(titleRef.current).call(wrap, 120);
  }, []);

  return (
    <g transform={`translate(${left}, 0)`}>
      <rect width={width} height={VECTOR_LINE_HEIGHT} fill={fill} />
      <text className={styles.percent} y={VECTOR_LINE_HEIGHT + 25}>
        {format0(percent * 100)}%
      </text>
      <text className={styles.title} y={55} ref={titleRef}>
        {title}
      </text>
    </g>
  );
};
