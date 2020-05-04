import * as d3 from "d3";
import { BAR_DATA } from "../constants/bar";
export class BarChart {
  private element?: SVGSVGElement;

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
    const x = d3.scaleLinear().domain([0, 7.7]).range([0, 555]);

    svg
      .append("g")
      .selectAll("rect")
      .data(BAR_DATA)
      .join("rect")
      .attr("x", x(0));
    // .attr("width", (d) => x(d.value) - x(0))
    // .attr("height", y.bandwidth());
  }
}
