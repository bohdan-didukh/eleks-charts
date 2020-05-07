import React, { useEffect, useState } from "react";

import styles from "./Info.module.scss";
import { InfoData, SPEED, SPEED_HALF } from "../../constants";

export interface InfoProps extends InfoData {
  top: number;
  index: number;
}
export const Info: React.FC<InfoProps> = ({
  top,
  left,
  title,
  fill,
  index,
}) => {
  const [hidden, setHidden] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setHidden(false), SPEED + SPEED_HALF + SPEED_HALF * index);
  }, [index]);
  return (
    <g
      className={`${styles.info} ${hidden ? styles.hidden : ""}`}
      transform={`translate(${left}, ${top})`}
    >
      <g className={styles.circle}>
        <circle r={5} fill={fill} />
      </g>
      <g className={styles.textBlock}>
        <text dx={12} className={styles.text}>
          {title}
        </text>
      </g>
    </g>
  );
};
