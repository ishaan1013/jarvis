// x/20 - 2.5
// 3*y/100 -2.25
export const mapTranslation = (x: number, y: number) => {
  return { x: x / 20 - 2.5, y: 1.5 - (3 * y) / 100 };
};

// 4pix/100 - 2pi
// 4piy/100 - 2pi
// 4piz/100 - 2pi
export const mapRotation = (x: number, y: number, z: number) => {
  const res = {
    x: (4 * Math.PI * y - 2 * Math.PI) * 0.25,
    y: (4 * Math.PI * x - 2 * Math.PI) * 0.25,
    z: 0,
  };

  console.log(res);

  return res;
};
