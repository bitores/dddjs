import Base from "../Base";

export class CanvasEvent extends Base {
  private eventName: string;
  private _event: Event;
  private _event_list: string[];
  constructor(public canvas: HTMLCanvasElement) {
    super()
    this._event_list = [
      'touchstart',
      'touchmove',
      'touchend',
      'mousedown',
      'mousemove',
      'mouseup'
    ];
    this.eventName = 'canvasevent';
    this.init()
    this.listen()
  }

  listen() {
    let canvas = this.canvas, _event = this._event;
    this._event_list.forEach(name => {
      canvas.addEventListener(name, (ev) => {
        _event['name'] = name;
        canvas.dispatchEvent(_event)
      })
    })
  }

  unlisten() {
    let canvas = this.canvas;
    this._event_list.forEach(name => {
      canvas.removeEventListener(name, () => { })
    })
  }

  init() {
    // 创建
    let ev = document.createEvent('HTMLEvents');
    // 初始化，事件类型，是否冒泡，是否阻止浏览器的默认行为
    ev.initEvent(this.eventName, false, true)
    //dfgdf
    ev["eventType"] = 'canvasevent';
    this._event = ev;
  }


  get className() {
    return 'CanvasEvent';
  }

  clone() {
    // return new UIShaderSource();
  }

  toString() {
    return '()';
  }
}