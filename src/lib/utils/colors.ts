/**
 * Generate a palette of distinct colors
 * @param colorCount
 * @returns
 */
export function generateDistinctColors(colorCount: number): string[] {
  const MAX_COLORS = 360;
  if (colorCount <= 0) {
    throw new Error("Cannot generate less than 1 color");
  }

  if(colorCount > MAX_COLORS) {
    throw new Error(`Cannot generate more than ${MAX_COLORS} colors`);
  }

  const colors: string[] = [];
  const step = 360 / colorCount;

  for (let i = 0; i < colorCount; i++) {
    const hue = i * step;
    const color = `hsl(${hue}, 40%, 40%)`;
    colors.push(color);
  }

  return colors;
}
