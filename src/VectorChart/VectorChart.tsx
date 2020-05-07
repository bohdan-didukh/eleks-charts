import React, { useEffect, useMemo, useState } from "react";
import { SPEED_QUAD, VECTOR_SIZE } from "../constants";

import styles from "./Vector.module.scss";

import { DONUT_COLOR_SET, DonutItem } from "../constants";
import { VectorItem } from "./VectorItem";
import { format } from "../utils";
import { calcItemProgress } from "../utils/helpers";

export interface VectorChartProps {
  data: DonutItem[];
}

export const VectorChart: React.FC<VectorChartProps> = ({ data }) => {
  const [progress, setProgress] = useState<number>(0);
  const total = useMemo(
    () => data.reduce((total, { value }) => value + total, 0),
    [data]
  );

  let endPercent = 0;

  const { width, height, left, right } = VECTOR_SIZE;

  useEffect(() => {
    const animateRect = (start: number) => {
      const animate = (timestamp: number) => {
        const timeProgress = timestamp - start;

        if (timeProgress < SPEED_QUAD) {
          setProgress(timeProgress / SPEED_QUAD);

          requestAnimationFrame(animate);
        } else {
          setProgress(1);
        }
      };

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animateRect);
  }, [total]);

  return (
    <svg
      width={width + left + right}
      height={height}
      style={{ position: "relative", left: -left }}
    >
      <g transform={`translate(${left},15)`}>
        <text className={styles.total}>
          EUR {format(total * progress)} billion signed in total
        </text>
      </g>
      <g transform={`translate(${left},34)`}>
        {data.map((item, index) => {
          const percent = Math.round((item.value / total) * 100) / 100;
          const itemWidth = percent * width;
          const startPercent = endPercent;
          endPercent += percent;

          const itemProgress = calcItemProgress({
            progress,
            startPercent,
            endPercent,
            percent,
          });

          return (
            <VectorItem
              key={item.title}
              data={item}
              left={(endPercent - percent) * width}
              width={itemWidth}
              percent={percent}
              progress={itemProgress}
              fill={DONUT_COLOR_SET[index]}
            />
          );
        })}
      </g>
    </svg>
  );
};
