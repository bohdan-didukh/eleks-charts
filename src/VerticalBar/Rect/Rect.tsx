import React, { useEffect, useMemo, useState } from "react";
import * as d3 from "d3";
import { ScaleBand, ScaleLinear } from "d3-scale";

import {
  IBarData,
  NAME_TOP,
  RECT_WIDTH,
  SPEED,
  SPEED_DOUBLE,
  VALUE_POSITION_INDEX,
} from "../../constants";

import styles from "./Rect.module.scss";
import { Tooltip, TooltipTypes } from "../../Tooltip";
import { BarTooltipProps } from "../../BarTooltip";

const format = d3.format(".1f");

export interface IRect {
  data: IBarData;
  y: ScaleLinear<number, number>;
  x: ScaleBand<string>;
  lineTop: number;
  index: number;
}

function showTooltip(data: BarTooltipProps) {
  const tooltip = new Tooltip();
  tooltip.set({
    visible: true,
    type: TooltipTypes.bar,
    data,
  });
}

function hideTooltip() {
  new Tooltip().hide();
}

export const Rect: React.FC<IRect> = ({
  data: { value, name, coFinanced },
  data,
  lineTop,
  x,
  y,
  index,
}) => {
  // animation progress from 0 to 1
  const [progress, setProgress] = useState<number>(0);

  // the end animation time of bars and name should be the same
  const nameHidden = progress < 0.5;

  const width = Math.min(x.bandwidth(), RECT_WIDTH);
  const height = lineTop - y(value);

  const percent = useMemo(() => coFinanced / value, [coFinanced, value]);
  const coHeight = height * percent;
  const coTop = height - coHeight + (coHeight - coHeight * progress);
  const coLeft = RECT_WIDTH * 2;

  const projectY = height - height * progress;
  const projectHeight = height * progress;

  const handleMove = () =>
    showTooltip({ ...data, percent: format(percent * 100) });

  useEffect(() => {
    const animateRect = (start: number) => {
      const animate = (timestamp: number) => {
        const timeProgress = timestamp - start;

        if (timeProgress < SPEED_DOUBLE) {
          setProgress(timeProgress / SPEED_DOUBLE);

          requestAnimationFrame(animate);
        } else {
          setProgress(1);
        }
      };

      requestAnimationFrame(animate);
    };

    setTimeout(() => requestAnimationFrame(animateRect), (SPEED * index) / 2);
  }, [index]);

  return (
    <g
      transform={`translate(${x(name)},${y(value)})`}
      onMouseOver={handleMove}
      onMouseOut={hideTooltip}
      className={styles.g}
    >
      <rect
        width={width}
        y={projectY}
        height={projectHeight}
        className={styles.rect}
      />
      <rect
        className={styles.coFinanced}
        width={width}
        y={coTop}
        x={coLeft}
        height={coHeight * progress}
      />
      <line
        className={styles.line}
        x1={RECT_WIDTH}
        y1={projectY}
        x2={RECT_WIDTH * 2}
        y2={projectY}
        opacity={progress}
      />
      <line
        className={styles.line}
        x1={coLeft + RECT_WIDTH}
        y1={coTop + 0.5}
        x2={coLeft + 2 * RECT_WIDTH}
        y2={coTop + 0.5}
        opacity={progress}
      />
      <text
        className={styles.value}
        x={RECT_WIDTH * VALUE_POSITION_INDEX}
        y={projectY}
        opacity={progress}
      >
        {format(value * progress)}
      </text>
      <text
        className={styles.value}
        x={coLeft + RECT_WIDTH * VALUE_POSITION_INDEX}
        y={coTop}
        opacity={progress}
      >
        <tspan>{format(coFinanced * progress)} - </tspan>
        <tspan className={styles.percent}>
          {format(percent * progress * 100)}%
        </tspan>
      </text>
      <text
        className={`${styles.name} ${nameHidden ? styles.hidden : ""}`}
        y={height + NAME_TOP}
      >
        {name}
      </text>
    </g>
  );
};
