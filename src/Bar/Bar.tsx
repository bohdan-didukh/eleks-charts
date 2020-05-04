import React, { useEffect } from "react";
import { Title } from "../Title";

import styles from "./Bar.module.scss";
import { DONUT_HEIGHT, DONUT_WIDTH } from "../constants";
import { BarChart } from "./BarChart";

export const Bar: React.FC = () => {
  const ref = React.createRef<SVGSVGElement>();
  useEffect(() => {
    // todo: new bar chart
    if (ref.current) new BarChart(ref.current);
  });

  return (
    <div className={styles.block}>
      <Title
        title="Co-financed Structural Programme Loans"
        yearStart={2013}
        yearEnd={2017}
        details="In billions of euro"
      />
      <svg
        ref={ref}
        className={styles.svg}
        width={DONUT_WIDTH}
        height={DONUT_HEIGHT}
      />
    </div>
  );
};
