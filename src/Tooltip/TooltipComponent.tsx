import React from "react";

import styles from "./Tooltip.module.css";

interface ITooltipComponent {
  visible: boolean;
  top?: number;
  left?: number;
  children?: React.ReactNode;
}
export const TooltipComponent: React.FC<ITooltipComponent> = ({
  visible,
  top = 0,
  left = 0,
  children = null,
}) => {
  return (
    <div
      className={`${styles.tooltip} ${visible ? styles.visible : ""}`}
      style={{ top, left: left + 20 }}
    >
      <div className={styles.body}>{children}</div>
    </div>
  );
};
