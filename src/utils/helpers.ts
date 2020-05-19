export const calcItemProgress = ({
  progress,
  startPercent,
  endPercent,
  percent,
}: {
  progress: number;
  startPercent: number;
  endPercent: number;
  percent: number;
}) => {
  if (progress < startPercent) {
    return 0;
  }
  if (progress > startPercent && progress < endPercent) {
    // percent = 100 %
    // progress - start percent - x%
    return (progress - startPercent) / percent;
  }
  return 1;
};
