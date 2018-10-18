import Base from "../Base";

export class UICanvas extends Base {
  ctx: WebGLRenderingContext | null;
  constructor(public canvas: HTMLCanvasElement) {
    super()
    this.ctx = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');
    if (this.ctx === null) {
      throw new Error('your browser not support the webgl .')
    } else {
      // this.width = this.ctx.
    }

    this.toString()
    this._init2()
  }

  _init2() {
    this.ctx = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');
    if (this.ctx === null) {
      throw new Error('your browser not support the webgl .')
    } else {
      // this.width = this.ctx.
    }
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