import Base from "../Base";

export class UICanvas extends Base {
  ctx: WebGLRenderingContext | null;
  constructor(public canvas: HTMLCanvasElement) {
    super()
    this.ctx = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');


    if (this.ctx === null) {
      throw new Error('your browser not support the webgl .')
    }

    return this;
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