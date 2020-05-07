import React, { useEffect, useState } from "react";

import styles from "./Title.module.scss";
import { SPEED_DOUBLE } from "../constants";

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
}) => {
  const [black, setBlack] = useState(styles.black);

  useEffect(() => {
    setTimeout(() => setBlack(""), SPEED_DOUBLE);
  }, []);

  return (
    <h2 className={`${styles.container} ${black} ${white ? styles.white : ""}`}>
      <div className={styles.title}>{title}</div>
      <span className={styles.years}>
        ({yearStart} - {yearEnd})
      </span>
      <span className={styles.details}>{details}</span>
    </h2>
  );
};
