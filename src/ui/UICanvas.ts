import Base from "../Base";
import { CanvasEvent } from "../event/CanvasEvent";

export class UICanvas extends Base {
  ctx: WebGLRenderingContext | null; //| CanvasRenderingContext2D 
  x: number;
  y: number;
  left: number;
  top: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
  _option: object = {}
  constructor(public canvas: HTMLCanvasElement, option: object = {}) {
    super()
    if (Object.prototype.toString.call(canvas) !== "[object HTMLCanvasElement]") {
      throw new TypeError('The first paramter is not the HTMLCanvasElement type.')
    }
    this._option = {
      // alpha: 0,//boolean值表明canvas包含一个alpha缓冲区。
      // depth: 0,//boolean值表明绘制缓冲区包含一个深度至少为16位的缓冲区。
      // stencil: 0,//boolean值表明绘制缓冲区包含一个深度至少为8位的模版缓冲区。
      // antialias: 0,//boolean值表明是否抗锯齿。
      // premultipliedAlpha: 0,//boolean值表明页面排版工人将在混合alpha通道前承担颜色缓冲区。
      // preserveDrawingBuffer: 0,//如果这个值为true缓冲区将不会清除它，会保存下来，直到被清除或被使用者覆盖。
      // failIfMajorPerformanceCaveat: 0,//boolean值表明在一个系统性能低的环境创建该上下文。
      antialias: true,
      depth: true,
      alpha: true,
      ...option
    }
    this.initEvent();
    this.initCanvasCtx(this._option);
    this.boundingRect();
    this.resize();
  }

  initEvent() {
    return new CanvasEvent(this.canvas);
  }

  private initCanvasCtx(option) {

    try {
      this.ctx = this.canvas.getContext('webgl', option) || this.canvas.getContext('experimental-webgl', option);
    } catch (e) {
      // this.ctx = this.canvas.getContext('webgl2', option) || this.canvas.getContext('experimental-webgl2', option);
    } finally {

    }

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

    // fix : canvas style- width and height, not the same as attribute
    this.canvas.setAttribute('width', `${this.width}`);
    this.canvas.setAttribute('height', `${this.height}`);

    return clientRect;
  }

  resize() {
    window.addEventListener('resize', () => this.boundingRect)
  }

  get gl() {
    return this.ctx;
  }

  clone() {
    return new UICanvas(this.canvas);
  }

  toString() {
    return '()';
  }
}