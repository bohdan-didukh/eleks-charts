import { SPEED_DOUBLE, SPEED_QUAD } from "../constants";

export function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) {
  let angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

export function describeArc(
  radius: number,
  startAngle: number,
  endAngle: number
) {
  const x = 0;
  const y = 0;
  let start = polarToCartesian(x, y, radius, endAngle);
  let end = polarToCartesian(x, y, radius, startAngle);

  let largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ");
}

/**
 * animate circle like a loading
 * @param draw
 */
export function animateCircle(draw: (angle: number) => void) {
  return new Promise((resolve) => {
    let start: number | null = null;

    const animate = (timestamp: number) => {
      if (!start) {
        start = timestamp;
      }

      const progress = timestamp - start;
      const percent = progress / SPEED_DOUBLE;

      if (progress < SPEED_DOUBLE) {
        draw(percent * 359);
        requestAnimationFrame(animate);
      } else {
        draw(359);
        requestAnimationFrame(resolve);
      }
    };

    requestAnimationFrame(animate);
  });
}

/**
 * animate circle like a loading
 * @param animatePercent
 */
export function animatePercents(animatePercent: (percent: number) => void) {
  return new Promise((resolve) => {
    let start: number | null = null;

    const animate = (timestamp: number) => {
      if (!start) {
        start = timestamp;
      }

      const progress = timestamp - start;
      const percent = progress / SPEED_QUAD;

      if (progress < SPEED_QUAD) {
        animatePercent(percent);
        requestAnimationFrame(animate);
      } else {
        animatePercent(1);
        requestAnimationFrame(resolve);
      }
    };

    requestAnimationFrame(animate);
  });
}
