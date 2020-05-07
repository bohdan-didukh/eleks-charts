import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

import { DonutItem, SPEED_DOUBLE, VECTOR_LINE_HEIGHT } from "../../constants";
import styles from "./VectorItem.module.scss";
import { format0, wrap } from "../../utils";
import { Tooltip, TooltipPosition, TooltipTypes } from "../../Tooltip";
import { IDonutTooltip } from "../../DonutTooltip";

export interface VectorItemProps {
  data: DonutItem;
  left: number;
  width: number;
  percent: number;
  fill: string;
  progress: number;
}

function showTooltip(data: IDonutTooltip) {
  const tooltip = new Tooltip();
  tooltip.set({
    visible: true,
    type: TooltipTypes.donut,
    data,
    position: TooltipPosition.bottom,
  });
}

function hideTooltip() {
  new Tooltip().hide();
}

export const VectorItem: React.FC<VectorItemProps> = ({
  data: { title },
  data,
  left,
  width,
  fill,
  percent,
  progress, // animation progress
}) => {
  const titleRef = useRef(null);

  const [gray, setGray] = useState<boolean>(true);

  useEffect(() => {
    d3.select(titleRef.current).call(wrap, 120);
    setTimeout(() => setGray(false), SPEED_DOUBLE);
  }, []);

  const handleMove = () =>
    showTooltip({ ...data, color: fill, percent: format0(percent * 100) });

  return (
    <g
      transform={`translate(${left}, 0)`}
      className={styles.item}
      onMouseOver={handleMove}
      onMouseOut={hideTooltip}
    >
      <g>
        <rect
          className={`${styles.rect} ${gray ? styles.gray : ""}`}
          width={progress * width}
          height={VECTOR_LINE_HEIGHT}
          fill={fill}
        />
      </g>
      <text
        className={styles.percent}
        y={VECTOR_LINE_HEIGHT + 25}
        opacity={progress}
      >
        {format0(percent * progress * 100)}%
      </text>
      <g className={`${styles.titleG} ${progress === 1 ? "" : styles.hidden}`}>
        <text className={styles.title} y={55} ref={titleRef}>
          {title}
        </text>
      </g>
    </g>
  );
};
