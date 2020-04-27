import React, { useEffect } from "react";

import styles from "./Donut.module.css";
import { DonutChart } from "./DonutChart";
import { DONUT_HEIGHT, DONUT_WIDTH } from "../constants";

export const Donut: React.FC = () => {
  const ref = React.createRef<SVGSVGElement>();
  useEffect(() => {
    if (ref.current) new DonutChart(ref.current);
  });

  return (
    <div className={styles.block}>
      <svg
        ref={ref}
        className={styles.svg}
        width={DONUT_WIDTH}
        height={DONUT_HEIGHT}
      />
    </div>
  );
};
