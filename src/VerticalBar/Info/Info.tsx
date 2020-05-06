import React from "react";

import styles from "./Info.module.scss";
import { NAME_TOP } from "../../constants";

export interface IInfo {
  lineTop: number;
}

export const Info: React.FC<IInfo> = ({ lineTop }) => {
  return (
    <g>
      <text className={styles.groupTitle} y={lineTop + NAME_TOP}>
        Structural Programme:
      </text>
    </g>
  );
};
