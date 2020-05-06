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

export const RECT_WIDTH = 6;

export const VERTICAL_BAR_POSITION: IBarPosition = {
  top: 40,
  right: 0,
  bottom: 178,
  left: 125,
  width: 905,
  height: 400,
};

export const NAME_TOP = 50;
