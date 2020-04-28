import React from "react";
import { GRAY } from "../constants";

import styles from "./DonutTooltip.module.css";

export interface IDonutTooltip {
  color?: string;
  title?: string;
  percent?: number;
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
      <span className={styles.circle} style={{ background: color }} />
      <span className={styles.title}>{title}</span>
      <div className={styles.percent}>{percent}%</div>
      <div className={styles.value}>EUR {value} billion</div>
    </div>
  );
};
