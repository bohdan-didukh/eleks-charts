import React from "react";

import styles from "./DonutTooltip.module.css";

export interface IDonutTooltip {
  color: string;
  title: string;
  percent: string;
  value: number;
}
export const DonutTooltip: React.FC<IDonutTooltip> = ({
  color,
  title,
  percent,
  value,
}) => {
  return (
    <div className={styles.tooltip}>
      <div className={styles.title}>{title}</div>
      <div>
        <span className={styles.circle} style={{ background: color }} />
        <span className={styles.value}>
          EUR {value} billion - {percent}%
        </span>
      </div>
    </div>
  );
};
