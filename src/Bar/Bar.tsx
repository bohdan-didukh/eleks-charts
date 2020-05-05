import React from "react";
import { Title } from "../Title";

import styles from "./Bar.module.scss";
import { BarChart } from "../BarChart";
import { BAR_DATA, BAR_POSITION } from "../constants/bar";

export const Bar: React.FC = () => {
  return (
    <div className={styles.block}>
      <Title
        title="Co-financed Structural Programme Loans"
        yearStart={2013}
        yearEnd={2017}
        details="In billions of euro"
      />
      <BarChart data={BAR_DATA} {...BAR_POSITION} />
    </div>
  );
};
