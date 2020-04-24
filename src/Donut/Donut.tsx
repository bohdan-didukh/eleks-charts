import React, { useEffect } from "react";

import styles from "./Donut.module.css";
import { DonutChart } from "./DonutChart";

export const Donut: React.FC = () => {
  const ref = React.createRef<SVGSVGElement>();
  useEffect(() => {
    if (ref.current) new DonutChart(ref.current);
  });

  return (
    <div className={styles.donut}>
      <svg ref={ref} className={styles.svg} />
    </div>
  );
};
