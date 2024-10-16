/**
 * Generate a palette of distinct colors
 * @param colorCount 
 * @returns 
 */
export function generateDistinctColors(colorCount: number): string[] {
    const colors: string[] = [];
    const step = 360 / colorCount;
    const maxColors = 360;

    for (let i = 0; i < Math.min(colorCount, maxColors); i++) {
      const hue = i * step;
      const color = `hsl(${hue}, 40%, 40%)`;
      colors.push(color);
    }

    return colors;
  }
