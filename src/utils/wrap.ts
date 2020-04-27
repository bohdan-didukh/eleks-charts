import * as d3 from "d3";
import { DONUT_TITLE_HEIGHT } from "../constants";

export function wrap(text: any, width: number) {
  text.each(function () {
    // @ts-ignore
    let text = d3.select(this),
      words = text.text().split(/\s+/).reverse(),
      word,
      line: string[] = [],
      lineNumber = 0,
      y = text.attr("y"),
      dy = 0, // parseFloat(text.attr("dy")),
      tspan = text
        .text(null)
        .append("tspan")
        .attr("x", 0)
        .attr("y", y)
        .attr("dy", dy + "em");
    while ((word = words.pop())) {
      line.push(word);
      tspan.text(line.join(" "));
      const node = tspan.node();
      if (node && node.getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text
          .append("tspan")
          .attr("x", 0)
          .attr("y", y)
          .attr("dy", ++lineNumber * DONUT_TITLE_HEIGHT + dy + "em")
          .text(word);
      }
    }
  });
}
