import React from "react";

import styles from "./Title.module.scss";

export interface ITitle {
  title: string;
  yearStart: number;
  yearEnd: number;
  details: string;
  white?: boolean;
}

export const Title: React.FC<ITitle> = ({
  title,
  yearStart,
  yearEnd,
  details,
  white = false,
}) => (
  <h2 className={`${styles.container} ${white ? styles.white : ""}`}>
    <div className={styles.title}>{title}</div>
    <span className={styles.years}>
      ({yearStart} - {yearEnd})
    </span>
    <span className={styles.details}>{details}</span>
  </h2>
);
