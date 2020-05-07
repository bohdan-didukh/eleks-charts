import {
  RED,
  RED_DARK,
  RED_LIGHT,
  YELLOW,
  YELLOW_DARK,
  YELLOW_LIGHT,
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
    value: 0.65,
  },
  {
    title: "Energy efficiency",
    value: 0.47,
  },
  {
    title: "Other",
    value: 0.28,
  },
  {
    title: "School rehabilitation",
    value: 0.14,
  },
];

export const DONUT_COLOR_SET: string[] = [
  RED_DARK,
  YELLOW_DARK,
  YELLOW,
  RED,
  YELLOW_LIGHT,
  RED_LIGHT,
];

export const OUTER_RADIUS = 103;
export const INNER_RADIUS = 71;
export const DONUT_PADDING = 150;
export const DONUT_WIDTH = OUTER_RADIUS * 2 + DONUT_PADDING * 2;
export const DONUT_HEIGHT = OUTER_RADIUS * 2 + DONUT_PADDING;

export const DONUT_TITLE_HEIGHT = 1.2; // in em
export const DONUT_TRANSFORM_RATIO = 0.12;
export const DONUT_TRANSFORM_LINE_RATIO = 0.5;
export const DONUT_TRANSFORM_LINE_SCALE_RATIO = 0.7;
export const DONUT_LABEL_RATIO = 1.55;

// loader
export const LOADER_RADIUS = (OUTER_RADIUS - INNER_RADIUS) / 2 + INNER_RADIUS;
export const LOADER_STROKE_WIDTH = OUTER_RADIUS - INNER_RADIUS;

export const DONUT_ANGLE = -0.17;
