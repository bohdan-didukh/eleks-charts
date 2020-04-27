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
import { wrap } from "../utils/wrap";

export class DonutChart<IDonutChart> {
  private readonly element: SVGSVGElement | null = null;

  constructor(element: SVGSVGElement) {
    this.element = element;
    this.render();
  }

  get total(): number {
    return (
      Math.round(
        DONUT_DATA.reduce((total, { value }) => total + value, 0) * 10
      ) / 10
    );
  }

  percent(value: number): number {
    return Math.round((value / this.total) * 100);
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
    const arc = d3.arc().innerRadius(INNER_RADIUS).outerRadius(OUTER_RADIUS);

    const gs = g.selectAll(".g").data(pieData).enter().append("g");

    gs.append("path")
      .attr("d", function (d) {
        // @ts-ignore
        return arc(d);
      })
      // @ts-ignore
      .attr("fill", ({ data }) => {
        return colorScale(data.title);
      });

    // total text
    g.append("text")
      .attr("class", styles.total)
      .text(`EUR ${this.total} billion total`)
      .call(wrap, 100);

    // draw piece lines
    gs.append("line")
      .attr("class", styles.line)
      .attr("x1", (d) => {
        // @ts-ignore
        return arc.centroid(d)[0] * 1.5;
      })
      .attr("y1", (d) => {
        // @ts-ignore
        return arc.centroid(d)[1] * 1.5;
      })
      .attr("x2", (d) => {
        // @ts-ignore
        return arc.centroid(d)[0] * 1.22;
      })
      .attr("y2", (d) => {
        // @ts-ignore
        return arc.centroid(d)[1] * 1.22;
      });

    // draw label
    gs.append("text")
      .attr("width", 150)
      .attr("transform", (d) => {
        // @ts-ignore
        const [x, y] = arc.centroid(d);
        return "translate(" + [x * 1.7, y * 1.7] + ")";
      })
      .attr("text-anchor", (d) => {
        // @ts-ignore
        const [x] = arc.centroid(d);

        if (Math.abs(x) < INNER_RADIUS / 2 || x > 0) {
          return "start";
        }
        return "end";
      })
      .attr("class", styles.title)
      .text((d) => d.data.title)
      .call(wrap, 150)
      .append("tspan")
      .text(({ value }) => {
        return `${this.percent(value).toString()}%`;
      })
      .attr("x", 0)
      .attr("dy", "1.2em")
      .attr("class", styles.percent);
  }
}
