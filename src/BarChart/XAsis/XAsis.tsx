import React, { useEffect, useRef } from "react";
import { ScaleLinear } from "d3-scale";
import * as d3 from "d3";

import styles from "./XAsis.module.scss";

export interface IXAsis {
  x: ScaleLinear<number, number>;
  top: number;
}
export const XAxis: React.FC<IXAsis> = ({ x, top }) => {
  const axis = useRef(null);

  useEffect(() => {
    // @ts-ignore
    const ticks = d3.select(axis.current).call(d3.axisTop(x));

    // remove domain
    ticks.selectAll(".domain").remove();

    // change styles for ticks
    ticks
      .selectAll("text")
      .attr("fill", null)
      .attr("class", styles.label)
      .attr("dy", null)
      .attr("y", null)
      .attr("dx", -7);

    ticks
      .selectAll("line")
      .attr("stroke", null)
      .attr("class", styles.line)
      .attr("y2", -top - 10);
  });

  return <g className="axis x" ref={axis} transform={`translate(0, ${top})`} />;
};
