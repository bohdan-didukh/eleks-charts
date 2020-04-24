import * as d3 from "d3";

import {
  DONUT_COLOR_SET,
  DONUT_DATA,
  DONUT_PADDING,
  DonutItem,
  INNER_RADIUS,
  OUTER_RADIUS,
} from "../constants";

import styles from "./Donut.module.css";

export class DonutChart<IDonutChart> {
  private readonly element: SVGSVGElement | null = null;

  constructor(element: SVGSVGElement) {
    this.element = element;
    this.render();
  }

  render() {
    const { element } = this;

    if (!element) {
      return;
    }

    const svg = d3.select(element);
    const g = svg
      .append("g")
      .attr("class", styles.donut)
      .attr(
        "transform",
        "translate(" +
          (OUTER_RADIUS + DONUT_PADDING) +
          "," +
          (OUTER_RADIUS + DONUT_PADDING) +
          ")"
      );

    const colorScale = d3.scaleOrdinal().range(DONUT_COLOR_SET);

    const pie = d3
      .pie<DonutItem>()
      .sort(null)
      .value((d) => d.value);

    const pieData = pie(DONUT_DATA);

    const gs = g.selectAll(".g").data(pieData).enter().append("g");

    gs.append("path")
      .attr("d", function (d) {
        // @ts-ignore
        return d3.arc().innerRadius(INNER_RADIUS).outerRadius(OUTER_RADIUS)(d);
      })
      // @ts-ignore
      .attr("fill", ({ data }) => {
        return colorScale(data.title);
      });
  }
}
