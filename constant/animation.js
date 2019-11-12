/**
 * Equation of a line.
 */
export const lineEq = (y2, y1, x2, x1, currentVal) => {
  // y = mx + b
  var m = (y2 - y1) / (x2 - x1), b = y1 - m * x1;
  return m * currentVal + b;
};
