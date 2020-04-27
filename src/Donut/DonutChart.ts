import * as d3 from "d3";

import { Selection, PieArcDatum } from "d3";

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
  private pieces?: Selection<
    SVGElementTagNameMap["g"],
    PieArcDatum<DonutItem>,
    SVGElementTagNameMap["g"],
    unknown
  >;
  private g?: Selection<SVGElementTagNameMap["g"], unknown, null, undefined>;

  constructor(element: SVGSVGElement) {
    this.element = element;
    this.render();
  }

  get arc() {
    return d3.arc().innerRadius(INNER_RADIUS).outerRadius(OUTER_RADIUS);
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

  drawPieces = () => {
    const { g, arc } = this;
    if (!g) {
      return;
    }

    const colorScale = d3.scaleOrdinal().range(DONUT_COLOR_SET);

    const pie = d3
      .pie<DonutItem>()
      .sort(null)
      .value((d) => d.value);

    const pieData = pie(DONUT_DATA);

    // draw donut pieces
    const gs = g
      .selectAll(".g")
      .data(pieData)
      .enter()
      .append("g")
      .attr("class", styles.piece);
    this.pieces = gs;

    gs.append("path")
      .attr("d", function (d) {
        // @ts-ignore
        return arc(d);
      })
      // @ts-ignore
      .attr("fill", ({ data }) => {
        return colorScale(data.title);
      });
  };

  drawTotal = () =>
    this.g
      ?.append("text")
      .attr("class", styles.total)
      .text(`EUR ${this.total} billion total`)
      .call(wrap, 100);

  drawLines = () => {
    // draw piece lines
    const { arc } = this;
    this.pieces
      ?.append("line")
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
  };

  drawLabels = () => {
    // draw label
    const { arc } = this;
    this.pieces
      ?.append("text")
      .attr("width", 150)
      .attr("transform", (d) => {
        // @ts-ignore
        const [x, y] = arc.centroid(d);
        return "translate(" + [x * 1.7, y * 1.7] + ")";
      })
      .attr("text-anchor", (d) => {
        // @ts-ignore
        const [x] = arc.centroid(d);
        return Math.abs(x) < INNER_RADIUS / 2 || x > 0 ? "start" : "end";
      })
      .attr("class", styles.title)
      .text((d) => d.data.title)
      .call(wrap, 150)
      .append("tspan")
      .text(({ value }) => `${this.percent(value).toString()}%`)
      .attr("x", 0)
      .attr("dy", "1.2em")
      .attr("class", styles.percent);
  };

  render() {
    const { element } = this;

    if (!element) {
      return;
    }

    const svg = d3.select(element);
    this.g = svg
      .append("g")
      .attr("class", styles.donut)
      .attr(
        "transform",
        "translate(" +
          (OUTER_RADIUS + DONUT_PADDING) +
          "," +
          (OUTER_RADIUS + DONUT_PADDING / 2) +
          ")"
      );

    this.drawPieces();
    this.drawTotal();
    this.drawLines();
    this.drawLabels();
  }
}
