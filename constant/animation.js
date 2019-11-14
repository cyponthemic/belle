/**
 * Equation of a line.
 */
export const lineEq = (y2, y1, x2, x1, currentVal) => {
  // y = mx + b
  var m = (y2 - y1) / (x2 - x1), b = y1 - m * x1;
  return m * currentVal + b;
};


export const lerp = (a,b,n) => (1 - n) * a + n * b;

export const distance = (x1,x2,y1,y2) => {
  var a = x1 - x2;
  var b = y1 - y2;
  return Math.hypot(a,b);
};

export const getMousePos = (e) => {
  let posx = 0;
  let posy = 0;
  if (!e) e = window.event;
  if (e.pageX || e.pageY) {
    posx = e.pageX;
    posy = e.pageY;
  }
  else if (e.clientX || e.clientY) 	{
    posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }
  return { x : posx, y : posy }
}
