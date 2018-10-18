import Base from "../Base";

export class UICanvas extends Base {
  ctx: WebGLRenderingContext | null;
  x: number;
  y: number;
  left: number;
  top: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
  constructor(public canvas: HTMLCanvasElement) {
    super()
    if (Object.prototype.toString.call(canvas) !== "[object HTMLCanvasElement]") {
      throw new TypeError('The first paramter is not the HTMLCanvasElement type.')
    }
    this.initCanvasCtx()
    this.boundingRect();
  }

  private initCanvasCtx() {

    this.ctx = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');
    if (this.ctx === null) {
      throw new Error('Your browser not support the webgl .')
    } else {
      return this.ctx;
    }
  }

  private boundingRect() {
    let clientRect = this.canvas.getBoundingClientRect();
    this.x = clientRect.left;
    this.y = clientRect.right;
    this.left = clientRect.left;
    this.top = clientRect.right;
    this.right = clientRect.right;
    this.bottom = clientRect.bottom;
    this.width = clientRect.width;
    this.height = clientRect.height;

    return clientRect;
  }

  get gl() {
    return this.ctx;
  }


  get className() {
    return 'Node';
  }

  clone() {
    return new UICanvas(this.canvas);
  }

  toString() {
    return '()';
  }
}