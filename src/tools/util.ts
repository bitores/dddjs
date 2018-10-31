export function RAD2DEG(x: number) {
  //弧度转角度

  return (x % 360) * 180.0 / Math.PI;
}

export function DEG2RAD(x: number) {
  //角度转弧度

  return x * Math.PI / 180.0;
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

export function point2Webgl(pos_x: number, pos_y: number) {
  return {
    x: pos_x - 1,
    y: 1 - pos_y
  }
}

// webgl :canvas-->image, you need contex{preserveDrawingBuffer: true}
export function convertCanvasToImage(canvas) {
  //新Image对象,可以理解为DOM;
  var image = new Image();
  //canvas.toDataURL返回的是一串Base64编码的URL,当然,浏览器自己肯定支持
  //指定格式PNG
  image.src = canvas.toDataURL("image/jpeg");
  return image;
}

export function fovy(height: number, near: number) {
  //fovy = 360/(pi*atan(2n/(h)))
  return 2 * 180.0 / (Math.PI * Math.atan((2 * near) / height));
}


// https://blog.csdn.net/opengl_es/article/details/36353579
export function isPowerOfTwo(x) {
  return (x & (x - 1)) == 0;
}

// https://blog.csdn.net/opengl_es/article/details/36353579
export function nextHighestPowerOfTwo(x) {
  --x;
  for (var i = 1; i < 32; i <<= 1) {
    x = x | x >> i;
  }
  return x + 1;
}

export function Image2PowerOfTwo(image) {
  if (!isPowerOfTwo(image.width) || !isPowerOfTwo(image.height)) {
    // Scale up the texture to the next highest power of two dimensions.
    var canvas = document.createElement("canvas");
    canvas.width = nextHighestPowerOfTwo(image.width);
    canvas.height = nextHighestPowerOfTwo(image.height);
    var ctx = canvas.getContext("2d");
    if (ctx === null) return;
    ctx.drawImage(image, 0, 0, image.width, image.height);
    image = canvas;
  }

  return image;
}

