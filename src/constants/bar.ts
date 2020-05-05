import { DONUT_HEIGHT, DONUT_WIDTH } from "./donut";

export interface IBarData {
  value: number;
  name: string;
  coFinanced: number;
}
export interface IBarPosition {
  top: number;
  right: number;
  bottom: number;
  left: number;
  width: number;
  height: number;
}
export interface IBarChart extends IBarPosition {
  data: IBarData[];
}

export const BAR_DATA: IBarData[] = [
  {
    name: "Environment",
    value: 4.5,
    coFinanced: 0.3,
  },

  {
    name: "Growth",
    value: 7.7,
    coFinanced: 0.36,
  },
  {
    name: "Transport",
    value: 6.8,
    coFinanced: 1,
  },
];

export const BAR_WIDTH = DONUT_WIDTH;
export const BAR_HEIGHT = DONUT_HEIGHT;

export const RECT_HEIGHT = 32;

export const BAR_POSITION: IBarPosition = {
  top: 20,
  right: 100,
  bottom: 120,
  left: 100,
  width: BAR_WIDTH,
  height: BAR_HEIGHT,
};

export const DASHED_SIZE = 2;
