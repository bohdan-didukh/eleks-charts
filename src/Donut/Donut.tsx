import React, { useEffect } from "react";

import styles from "./Donut.module.scss";
import { DonutChart } from "./DonutChart";
import { DONUT_HEIGHT, DONUT_WIDTH } from "../constants";
import { Title } from "../Title";

export const Donut: React.FC = () => {
  const ref = React.createRef<SVGSVGElement>();
  useEffect(() => {
    if (ref.current) new DonutChart(ref.current);
  });

  return (
    <section className={styles.block}>
      <Title
        title="EIB total lending in Romania by sector"
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
    </section>
  );
};
