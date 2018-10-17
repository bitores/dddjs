export function RAD2DEG(x: number) {
  //弧度转角度

  return (x) * 180. / Math.PI;
}

export function DEG2RAD(x: number) {
  //角度转弧度

  return (x) * Math.PI / 180;
}
/**
 * pos_x: canvas x position
 * pos_y: canvas y position
 * width: canvas with
 * height: canvas height
 * point_x: point on screen 
 * point_y: point on screen
 *  */
export function canvas2Webgl(pos_x: number, pos_y: number, width: number, height: number, point_x: number, point_y: number) {
  // canvas to webgl
  // https://blog.csdn.net/lzwdlut/article/details/52243009
  let point_oncanvas_x = point_x - pos_x;
  let point_oncanvas_y = point_y - pos_y;

  let x0_webgl = 2.0 / width * point_oncanvas_x;
  let y0_webgl = 2.0 / height * point_oncanvas_y;

  return {
    x: -1 + x0_webgl,
    y: 1 - y0_webgl
  }
}