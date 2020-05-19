import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import styles from "./Navigation.module.scss";
import { SPEED_DOUBLE } from "../constants";

export const Navigation = () => {
  const [black, setBlack] = useState(styles.black);

  useEffect(() => {
    setTimeout(() => setBlack(""), SPEED_DOUBLE);
  }, []);

  return (
    <nav className={`${styles.nav} ${black}`}>
      <NavLink
        to="/"
        className={styles.item}
        activeClassName={styles.active}
        exact
      >
        Infographic No. 1
      </NavLink>
      <NavLink
        to="/bar"
        className={styles.item}
        activeClassName={styles.active}
        exact
      >
        Infographic No. 2
      </NavLink>
    </nav>
  );
};
