import * as d3 from "d3";

import { Selection, PieArcDatum } from "d3";

import {
  DONUT_COLOR_SET,
  DONUT_DATA,
  DONUT_LABEL_RATIO,
  DONUT_PADDING,
  DONUT_TRANSFORM_LINE_RATIO,
  DONUT_TRANSFORM_LINE_SCALE_RATIO,
  DONUT_TRANSFORM_RATIO,
  DonutItem,
  INNER_RADIUS,
  OUTER_RADIUS,
  SPEED,
} from "../constants";

import styles from "./Donut.module.scss";
import { wrap } from "../utils/wrap";
import { Tooltip, TooltipTypes } from "../Tooltip";

export class DonutChart<IDonutChart> {
  private readonly element: SVGSVGElement | null = null;
  private pieces?: Selection<
    SVGElementTagNameMap["g"],
    PieArcDatum<DonutItem>,
    SVGElementTagNameMap["g"],
    unknown
  >;

  private tooltip: Tooltip = new Tooltip();
  private g?: Selection<SVGElementTagNameMap["g"], unknown, null, undefined>;

  constructor(element: SVGSVGElement) {
    this.element = element;
    this.render();
    this.animation();
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

  colorScale = d3.scaleOrdinal().range(DONUT_COLOR_SET);

  percent(value: number): number {
    return Math.round((value / this.total) * 100);
  }

  drawPieces = () => {
    const { g } = this;
    if (!g) {
      return;
    }

    const pie = d3
      .pie<DonutItem>()
      .sort(null)
      .value((d) => d.value);

    const pieData = pie(DONUT_DATA);

    // draw donut pieces
    this.pieces = g
      .selectAll(".g")
      .data(pieData)
      .enter()
      .append("g")
      .attr("class", styles.piece)
      .on("mouseout", this.disablePieces);
  };

  drawPiecePaths = () => {
    const { arc } = this;
    this.pieces
      ?.append("path")
      .attr("class", styles.piecePath)
      .attr("d", function (d) {
        // @ts-ignore
        return arc(d);
      })
      // @ts-ignore
      .attr("fill", ({ data }) => {
        return this.colorScale(data.title);
      })
      .on("mouseover", this.onPieceOver);
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
        return arc.centroid(d)[0] * 1.24;
      })
      .attr("y1", (d) => {
        // @ts-ignore
        return arc.centroid(d)[1] * 1.24;
      })
      .attr("x2", (d) => {
        // @ts-ignore
        return arc.centroid(d)[0] * 1.5;
      })
      .attr("y2", (d) => {
        // @ts-ignore
        return arc.centroid(d)[1] * 1.5;
      });
  };

  drawLabels = () => {
    // draw label
    const { arc } = this;

    this.pieces
      ?.append("text")
      .attr("width", 150)
      .attr("x", (d) => {
        // @ts-ignore
        let [x] = arc.centroid(d);
        return x * DONUT_LABEL_RATIO;
      })
      .attr("y", (d) => {
        // @ts-ignore
        let [x, y] = arc.centroid(d);
        if (Math.abs(x) < INNER_RADIUS / 2) {
          y -= 5;
        }
        return y * DONUT_LABEL_RATIO;
      })
      .attr("text-anchor", (d) => {
        // @ts-ignore
        const [x] = arc.centroid(d);
        return Math.abs(x) < INNER_RADIUS / 2 || x > 0 ? "start" : "end";
      })
      .attr("class", styles.title)
      .text((d) => d.data.title)
      .on("mouseover", this.onPieceOver)
      .call(wrap, 150)
      .append("tspan")
      .text(({ value }) => `${this.percent(value).toString()}%`)
      .attr("x", function (d) {
        // @ts-ignore
        let [x] = arc.centroid(d);
        return x * DONUT_LABEL_RATIO;
      })
      .attr("dy", "1.2em")
      .attr("class", styles.percent);
  };

  onPieceOver = (d: PieArcDatum<DonutItem>, i: number) => {
    const g = this.pieces?.nodes()[i];
    if (!g) {
      return;
    }

    this.disablePieces();

    // @ts-ignore
    const [x, y] = this.arc.centroid(d);

    const el = d3.select(g);
    const piecePath = el.select(`.${styles.piecePath}`);
    const pieceLine = el.select(`.${styles.line}`);

    piecePath.attr(
      "transform",
      `translate(${[x * DONUT_TRANSFORM_RATIO, y * DONUT_TRANSFORM_RATIO]})`
    );
    pieceLine.attr(
      "transform",
      `translate(${[
        x * DONUT_TRANSFORM_LINE_RATIO,
        y * DONUT_TRANSFORM_LINE_RATIO,
      ]}) scale(${DONUT_TRANSFORM_LINE_SCALE_RATIO})`
    );

    this.tooltip.set({
      visible: true,
      type: TooltipTypes.donut,
      data: {
        color: this.colorScale(d.data.title) as string,
        title: d.data.title,
        percent: this.percent(d.value),
        value: d.value,
      },
    });
  };

  animation() {
    const node = this.g?.node();
    if (node) {
      node.classList.add(styles.hidden);
      node.classList.add(styles.delay);
      setTimeout(() => {
        // show labels
        node.classList.remove(styles.hidden);

        setTimeout(() => {
          node.classList.remove(styles.delay);
        }, SPEED * 4);
      }, SPEED * 4);
    }
  }

  disablePieces = () => {
    this.g?.selectAll(`.${styles.piecePath}`).attr("transform", null);
    this.g?.selectAll(`.${styles.line}`).attr("transform", null);
    this.tooltip.hide();
  };

  render() {
    const { element } = this;

    if (!element) {
      return;
    }

    const svg = d3.select(element);
    this.g = svg
      .append("g")
      .attr("class", `${styles.donut}`)
      .attr(
        "transform",
        "translate(" +
          (OUTER_RADIUS + DONUT_PADDING) +
          "," +
          (OUTER_RADIUS + DONUT_PADDING / 2) +
          ")"
      );

    this.drawTotal();
    this.drawPieces();
    this.drawLabels();
    this.drawLines();
    this.drawPiecePaths();
  }
}
