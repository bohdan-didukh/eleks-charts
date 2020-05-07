import * as d3 from "d3";

import { Selection, PieArcDatum } from "d3";

import {
  DONUT_ANGLE,
  DONUT_COLOR_SET,
  DONUT_DATA,
  DONUT_LABEL_RATIO,
  DONUT_PADDING,
  DONUT_TRANSFORM_LINE_RATIO,
  DONUT_TRANSFORM_LINE_SCALE_RATIO,
  DONUT_TRANSFORM_RATIO,
  DonutItem,
  INNER_RADIUS,
  LOADER_RADIUS,
  LOADER_STROKE_WIDTH,
  OUTER_RADIUS,
} from "../constants";

import styles from "./Donut.module.scss";
import { format, format0, wrap } from "../utils";
import { Tooltip, TooltipTypes } from "../Tooltip";
import { animateCircle, animatePercents, describeArc } from "./helpers";
import { calcItemProgress } from "../utils/helpers";

export class DonutChart {
  private readonly element: SVGSVGElement | null = null;
  private pieces?: Selection<
    SVGElementTagNameMap["g"],
    PieArcDatum<DonutItem>,
    SVGElementTagNameMap["g"],
    unknown
  >;

  private tooltip: Tooltip = new Tooltip();
  private g?: Selection<SVGElementTagNameMap["g"], unknown, null, undefined>;
  private loader?: Selection<
    SVGElementTagNameMap["path"],
    unknown,
    null,
    undefined
  >;

  constructor(element: SVGSVGElement) {
    this.element = element;
    this.render();
    this.animation();
  }

  get arc() {
    return d3.arc().innerRadius(INNER_RADIUS).outerRadius(OUTER_RADIUS);
  }

  get total(): number {
    return DONUT_DATA.reduce((total, { value }) => total + value, 0);
  }

  colorScale = d3.scaleOrdinal().range(DONUT_COLOR_SET);

  percent(value: number): number {
    return Math.round((value / this.total) * 100);
  }

  drawLoader = (endAngle = 0, stroke = LOADER_STROKE_WIDTH) => {
    const { g, loader } = this;

    if (!g) return;

    if (!loader) {
      this.loader = g.append("path").attr("class", styles.loader);
    }
    this.loader
      ?.attr("stroke-width", stroke)
      .attr("d", describeArc(LOADER_RADIUS, 0, endAngle));
  };

  drawPieces = () => {
    const { g } = this;
    if (!g) return;

    const pie = d3
      .pie<DonutItem>()
      .startAngle(DONUT_ANGLE * Math.PI)
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
      ?.append("g")
      .attr("class", `${styles.total} ${styles.hidden}`)
      .append("text")
      .text(`EUR ${format(this.total)} billion signed in total`)
      .call(wrap, 140);

  drawLines = () => {
    // draw piece lines
    const { arc } = this;
    this.pieces
      ?.append("line")
      .attr("class", `${styles.line} ${styles.hidden}`)
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
        return arc.centroid(d)[0] * 1.45;
      })
      .attr("y2", (d) => {
        // @ts-ignore
        return arc.centroid(d)[1] * 1.45;
      });
  };

  drawLabels = () => {
    // draw label
    const { arc } = this;

    this.pieces
      ?.append("g")
      .attr("class", `${styles.title} ${styles.hidden}`)
      .append("text")
      .attr("width", 150)
      .attr("x", (d) => {
        // @ts-ignore
        let [x] = arc.centroid(d);
        return x * DONUT_LABEL_RATIO;
      })
      .attr("y", (d) => {
        // @ts-ignore
        let [x, y] = arc.centroid(d);
        y += 3;
        if (Math.abs(x) < INNER_RADIUS / 2) {
          y += 5;
        }
        return y * DONUT_LABEL_RATIO;
      })
      .attr("dy", ".6em")
      .attr("text-anchor", (d) => {
        // @ts-ignore
        const [x] = arc.centroid(d);
        return Math.abs(x) < INNER_RADIUS / 2 || x > 0 ? "start" : "end";
      })

      .text((d) => d.data.title)
      .on("mouseover", this.onPieceOver)
      .call(wrap, 150);
  };

  drawValues = () => {
    const { arc } = this;
    this.pieces
      ?.append("g")
      .attr("class", styles.value)
      .append("text")
      .text(({ value }) => `${this.percent(value)}%`)
      .attr("text-anchor", (d) => {
        // @ts-ignore
        const [x] = arc.centroid(d);
        return Math.abs(x) < INNER_RADIUS / 2 || x > 0 ? "start" : "end";
      })
      .attr("x", function (d) {
        // @ts-ignore
        let [x] = arc.centroid(d);
        return x * DONUT_LABEL_RATIO;
      })
      .attr("y", (d) => {
        // @ts-ignore
        let [x, y] = arc.centroid(d);
        y += 5;
        if (Math.abs(x) < INNER_RADIUS / 2) {
          y += 5;
        }
        return y * DONUT_LABEL_RATIO - 10;
      })
      .call(wrap, 150);
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
      "style",
      `transform: translate(${[
        x * DONUT_TRANSFORM_RATIO + "px",
        y * DONUT_TRANSFORM_RATIO + "px",
      ]})`
    );
    pieceLine.attr(
      "style",
      `transform: translate(${[
        x * DONUT_TRANSFORM_LINE_RATIO + "px",
        y * DONUT_TRANSFORM_LINE_RATIO + "px",
      ]}) scale(${DONUT_TRANSFORM_LINE_SCALE_RATIO})`
    );

    this.tooltip.set({
      visible: true,
      type: TooltipTypes.donut,
      data: {
        color: this.colorScale(d.data.title) as string,
        title: d.data.title,
        percent: "" + this.percent(d.value),
        value: d.value,
      },
    });
  };

  disablePieces = () => {
    this.g?.selectAll(`.${styles.piecePath}`).attr("style", null);
    this.g?.selectAll(`.${styles.line}`).attr("style", null);
    this.tooltip.hide();
  };

  animation() {
    const node = this.g?.node();
    if (node) {
      node.classList.add(styles.hidden);

      requestAnimationFrame(() => {
        animateCircle(this.drawLoader).then(() => {
          d3.selectAll(`.${styles.total}`).attr("class", styles.total);
          node.classList.add(styles.showPieces);
        });
        animatePercents(this.animatePercents).then(() => {
          node.classList.remove(styles.hidden);
        });
      });
    }
  }

  /**
   *
   * @param progress is from 0 to 1
   */
  animatePercents = (progress: number) => {
    const total = this.total;
    let endPercent = 0;

    d3.selectAll(`.${styles.value} tspan`)
      // @ts-ignore
      .text(({ value }, index) => {
        const percent = Math.round((value / total) * 100) / 100;
        const startPercent = endPercent;
        endPercent += percent;

        const itemProgress = calcItemProgress({
          progress,
          startPercent,
          endPercent,
          percent,
        });

        // d3.select(node[index]).attr("opacity", itemProgress);
        if (this.pieces) {
          const node = d3.select(this.pieces.nodes()[index]);
          if (itemProgress === 1) {
            node.select(`.${styles.title}`).attr("class", styles.title);
            node.select(`.${styles.line}`).attr("class", styles.line);
          }
          node.select(`.${styles.value}`).attr("opacity", itemProgress);
        }

        return `${format0(itemProgress * this.percent(value))}%`;
      });
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

    this.drawLoader();
    this.drawTotal();
    this.drawPieces();
    this.drawLabels();
    this.drawValues();
    this.drawLines();
    this.drawPiecePaths();
  }
}
