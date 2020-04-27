import {
  BLUE,
  DARK_BLUE,
  GRAY,
  LIGHT_BLUE,
  LIGHT_ORANGE,
  ORANGE,
} from "./colors";

export interface DonutItem {
  title: string;
  value: number;
}

export const DONUT_DATA: DonutItem[] = [
  {
    title: "SMEs",
    value: 1.04,
  },
  {
    title: "Transport",
    value: 1.01,
  },
  {
    title: "Industry, services and agriculture",
    value: 0.648,
  },
  {
    title: "Energy efficiency",
    value: 0.468,
  },
  {
    title: "School rehabilitation",
    value: 0.144,
  },
  {
    title: "Other",
    value: 0.288,
  },
];

export const DONUT_COLOR_SET: string[] = [
  DARK_BLUE,
  ORANGE,
  LIGHT_BLUE,
  LIGHT_ORANGE,
  BLUE,
  GRAY,
];

export const OUTER_RADIUS = 103;
export const INNER_RADIUS = 71;
export const DONUT_PADDING = 200;
export const DONUT_SIZE = OUTER_RADIUS * 2 + DONUT_PADDING * 2;
