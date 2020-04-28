import React from "react";
import ReactDOM from "react-dom";
import { TooltipComponent } from "./TooltipComponent";
import { DonutTooltip, IDonutTooltip } from "../DonutTooltip";

export enum TooltipPosition {
  top = "top",
  left = "left",
  bottom = "bottom",
  right = "right",
}

export enum TooltipTypes {
  donut = "donut",
}

export type TooltipPositionType = keyof typeof TooltipPosition;
export type TooltipType = keyof typeof TooltipTypes;

const TOOLTIP_ID = "tooltip";

export class Tooltip {
  private static instance: Tooltip;
  private visible: boolean = false;
  private top: number = 0;
  private left: number = 0;
  private position: TooltipPositionType = TooltipPosition.bottom;
  private type: TooltipType = TooltipTypes.donut;
  private data: IDonutTooltip = {};

  constructor() {
    if (typeof Tooltip.instance === "object") {
      return Tooltip.instance;
    }

    Tooltip.instance = this;

    this.initialize();
    this.render();
  }

  initialize() {
    const div = document.createElement("div");
    div.id = TOOLTIP_ID;
    document.body.appendChild(div);
  }

  render() {
    const { visible, top, left, position, data } = this;
    ReactDOM.render(
      <React.StrictMode>
        <TooltipComponent {...{ visible, top, left, position }}>
          <DonutTooltip {...data} />
        </TooltipComponent>
      </React.StrictMode>,
      document.getElementById(TOOLTIP_ID)
    );
  }

  setVisible = (visible = false) => {
    this.visible = visible;
    this.render();
  };

  hide = this.setVisible;

  // some king of setState
  set = ({
    visible = this.visible,
    top = this.top,
    left = this.left,
    position = this.position,
    type = this.type,
    data = this.data,
  }) => {
    Object.assign(this, { visible, top, left, position, type, data });
    this.render();
  };
}
