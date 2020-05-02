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
    value: 0.65,
  },
  {
    title: "Energy efficiency",
    value: 0.47,
  },
  {
    title: "School rehabilitation",
    value: 0.14,
  },
  {
    title: "Other",
    value: 0.28,
  },
];

export const DONUT_COLOR_SET: string[] = [
  DARK_BLUE,
  ORANGE,
  BLUE,
  LIGHT_ORANGE,
  LIGHT_BLUE,
  GRAY,
];

export const OUTER_RADIUS = 103;
export const INNER_RADIUS = 71;
export const DONUT_PADDING = 180;
export const DONUT_WIDTH = OUTER_RADIUS * 2 + DONUT_PADDING * 2;
export const DONUT_HEIGHT = OUTER_RADIUS * 2 + DONUT_PADDING;

export const DONUT_TITLE_HEIGHT = 1.2; // in em
export const DONUT_TRANSFORM_RATIO = 0.12;
export const DONUT_TRANSFORM_LINE_RATIO = 0.5;
export const DONUT_TRANSFORM_LINE_SCALE_RATIO = 0.7;
export const DONUT_LABEL_RATIO = 1.65;

// loader
export const LOADER_RADIUS = (OUTER_RADIUS - INNER_RADIUS) / 2 + INNER_RADIUS;
export const LOADER_STROKE_WIDTH = OUTER_RADIUS - INNER_RADIUS;
