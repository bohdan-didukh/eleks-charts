import * as d3 from "d3";

import {
  DONUT_COLOR_SET,
  DONUT_DATA,
  DonutItem,
  INNER_RADIUS,
  OUTER_RADIUS,
} from "../constants";

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
    const g = svg.append("g");

    const colorScale = d3.scaleOrdinal().range(DONUT_COLOR_SET);

    const pie = d3.pie<DonutItem>();

    const pieData = pie(
      DONUT_DATA.map((item) => ({ ...item, valueOf: () => item.value }))
    );

    const gs = g
      .selectAll(".g")
      .data(pieData)
      .enter()
      .append("g")
      .attr(
        "transform",
        "translate(" + OUTER_RADIUS + "," + OUTER_RADIUS + ")"
      );

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
