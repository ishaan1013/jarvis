// x/20 - 2.5
// 3*y/100 -2.25
export const mapXY = (x: number, y: number) => {
  return { x: x / 20 - 2.5, y: 1.5 - (3 * y) / 100 };
};
