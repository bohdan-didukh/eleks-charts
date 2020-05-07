import React from "react";
import { GRAY } from "../constants";

import styles from "./DonutTooltip.module.css";

export interface IDonutTooltip {
  color?: string;
  title?: string;
  percent?: string;
  value?: number;
}
export const DonutTooltip: React.FC<IDonutTooltip> = ({
  color = GRAY,
  title = "Default title",
  percent = 25,
  value = 25,
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
