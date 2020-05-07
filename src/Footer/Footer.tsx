import React from "react";
import { Title } from "../Title";

import styles from "./Footer.module.scss";

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <main>
        <div>Version 2</div>
        <Title
          title="EIB total lending in Romania by sector"
          yearStart={2013}
          yearEnd={2017}
          details="In billions of euro"
          white
        />
      </main>
    </footer>
  );
};
