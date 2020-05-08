import React from "react";

import styles from "./Tooltip.module.css";
import { TooltipPosition, TooltipPositionType } from "./Tooltip";

interface ITooltipComponent {
  visible: boolean;
  top?: number;
  left?: number;
  children?: React.ReactNode;
  position: TooltipPositionType;
}
export const TooltipComponent: React.FC<ITooltipComponent> = ({
  visible,
  top = 0,
  left = 0,
  children = null,
  position,
}) => {
  return (
    <div
      className={`${styles.tooltip} ${visible ? styles.visible : ""}  ${
        styles[position]
      }`}
      style={{
        top,
        left: position === TooltipPosition.left ? left - 240 : left + 40,
      }}
    >
      <div className={styles.body}>{children}</div>
    </div>
  );
};
