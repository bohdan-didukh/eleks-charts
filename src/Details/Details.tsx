import React from "react";

import styles from "./Details.module.css";

export const Details = () => {
  return (
    <>
      <div className={styles.text}>
        CTF - 1518 ‘Graphic design and creative services for the EIB’s
        Communication Department’
      </div>
      <div className={styles.title}>
        Animated infographic and based on the brocure ‘Bank’s activity in
        Romania’ No 1:
        <br />
        ‘EIB total lending in Romania by sector (2013-2017)' and ‘Co-financed
        Structural Programme Loans (2013-2017)’
      </div>
      <div className={styles.version}>Version 1</div>
    </>
  );
};
