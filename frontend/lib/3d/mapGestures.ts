export const mapGestures = (gesture: string) => {
  switch (gesture) {
    case "Closed_Fist":
      return "drag";
    case "Victory":
      return "rotate";
    case "ILoveYou":
      return "scale";
    case "Pointing_Up":
      return "point";
    default:
      return null;
  }
};
