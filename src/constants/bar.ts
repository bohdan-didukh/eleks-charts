import { BLUE_DARK, ORANGE } from "./colors";

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

export interface InfoData {
  left: number;
  title: string;
  fill: string;
}
export const BAR_DATA: IBarData[] = [
  {
    name: "Transport",
    value: 6.8,
    coFinanced: 1,
  },
  {
    name: "Growth",
    value: 7.7,
    coFinanced: 0.36,
  },
  {
    name: "Environment",
    value: 4.5,
    coFinanced: 0.3,
  },
];

export const INFO_TITLES: InfoData[] = [
  {
    left: 80,
    title: "Total project value",
    fill: BLUE_DARK,
  },
  {
    left: 275,
    title: "Co-financed",
    fill: ORANGE,
  },
];

export const RECT_WIDTH = 10;

export const VERTICAL_BAR_POSITION: IBarPosition = {
  top: 30,
  right: 0,
  bottom: 80,
  left: 0,
  width: 487,
  height: 340,
};

export const NAME_TOP = 22;
export const INFO_TOP = 60;

export const VALUE_POSITION_INDEX = 2.5;
