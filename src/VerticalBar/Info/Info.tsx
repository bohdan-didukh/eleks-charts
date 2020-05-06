import React from "react";

import styles from "./Info.module.scss";
import { InfoData } from "../../constants";

export interface InfoProps extends InfoData {
  top: number;
}
export const Info: React.FC<InfoProps> = ({ top, left, title, fill }) => {
  return (
    <g className={styles.info} transform={`translate(${left}, ${top})`}>
      <circle r={5} fill={fill} className={styles.circle} />
      <text dx={12} className={styles.text}>
        {title}
      </text>
    </g>
  );
};
