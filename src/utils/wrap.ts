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
      x = text.attr("x") || 0,
      y = text.attr("y") || 0,
      dy = parseFloat(text.attr("dy")) || 0,
      tspan = text
        .text(null)
        .append("tspan")
        .attr("x", x)
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
          .attr("x", x)
          .attr("y", y)
          .attr("dy", ++lineNumber * DONUT_TITLE_HEIGHT + dy + "em")
          .text(word);
      }
    }
  });
}
