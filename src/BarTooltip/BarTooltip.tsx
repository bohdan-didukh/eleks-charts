import React from "react";
import { IBarData, INFO_TITLES } from "../constants";

import styles from "./BarTooltip.module.scss";

export interface BarTooltipProps extends IBarData {
  percent: string;
}
export const BarTooltip: React.FC<BarTooltipProps> = ({
  value,
  name,
  coFinanced,
  percent,
  objectives,
}) => {
  const [{ title: projectTitle }, { title: coTitle }] = INFO_TITLES;
  return (
    <div className={styles.tooltip}>
      <div className={styles.title}>{name}</div>
      <div className={styles.info}>{projectTitle}</div>
      <div>
        <span className={`${styles.circle} ${styles.blue}`} />
        <span className={styles.value}>EUR {value} billion</span>
      </div>
      <div className={styles.info}>{coTitle}</div>
      <div>
        <span className={`${styles.circle} ${styles.orange}`} />
        <span className={styles.value}>
          EUR {coFinanced} billion - {percent}%
        </span>
      </div>
      {objectives.length && (
        <>
          <h4 className={styles.objectivesTitle}>Objectives</h4>
          <ul className={styles.objectives}>
            {objectives.map((objective) => (
              <li key={objective} className={styles.objective}>
                {objective}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
