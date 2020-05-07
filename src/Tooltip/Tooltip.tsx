import React from "react";
import ReactDOM from "react-dom";
import { TooltipComponent } from "./TooltipComponent";
import { DonutTooltip, IDonutTooltip } from "../DonutTooltip";
import { BarTooltip, BarTooltipProps } from "../BarTooltip";

export enum TooltipPosition {
  top = "top",
  left = "left",
  bottom = "bottom",
  right = "right",
}

export enum TooltipTypes {
  donut = "donut",
  bar = "bar",
}

export type TooltipPositionType = keyof typeof TooltipPosition;
export type TooltipType = keyof typeof TooltipTypes;

const TOOLTIP_ID = "tooltip";

export class Tooltip {
  private static instance: Tooltip;
  private visible: boolean = false;
  private top: number = 0;
  private left: number = 0;
  private position: TooltipPositionType = TooltipPosition.right;
  private type: TooltipType = TooltipTypes.donut;
  private data?: IDonutTooltip | BarTooltipProps;

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
    const { visible, top, left, position, data, type } = this;

    ReactDOM.render(
      <React.StrictMode>
        <TooltipComponent {...{ visible, top, left, position }}>
          {data && (
            <>
              {type === TooltipTypes.donut && (
                <DonutTooltip {...(data as IDonutTooltip)} />
              )}
              {type === TooltipTypes.bar && (
                <BarTooltip {...(data as BarTooltipProps)} />
              )}
            </>
          )}
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
    position = TooltipPosition.right,
    type = this.type,
    data = this.data,
  }) => {
    Object.assign(this, { visible, top, left, position, type, data });
    this.render();
  };
}

const handleMove = ({ pageX: left, pageY: top }: MouseEvent) => {
  const tooltip = new Tooltip();
  tooltip.set({ top, left });
};

document.body.addEventListener("mousemove", handleMove);
