import React, { useEffect, useState } from "react";
import styles from "./Line.module.scss";

export interface LineProps {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

export const Line: React.FC<LineProps> = ({ x1, x2, y1, y2 }) => {
  const [hidden, setHidden] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setHidden(false), 0);
  }, []);

  return (
    <line
      x1={x1}
      x2={x2}
      y1={y1}
      y2={y2}
      className={`${styles.line} ${hidden ? styles.hidden : ""}`}
    />
  );
};
