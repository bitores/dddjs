import Base from "../Base";

export class CanvasEvent extends Base {
  private eventName: string;
  private _event: Event;
  private _event_list: string[];
  private _drag: boolean = false;
  constructor(public canvas: HTMLCanvasElement) {
    super()

    this.platformEvent();
    this.init()
    this.listen()
  }

  platformEvent() {
    let mobile = 'ontouchstart' in window;
    if (mobile) {
      this._event_list = [
        'touchstart',
        'touchmove',
        'touchend'
      ]
    } else {
      this._event_list = [
        'mousedown',
        'mousemove',
        'mouseup'
      ];
    }

    this.eventName = 'webgl';
  }

  listen() {
    let canvas = this.canvas, _event = this._event;
    this._event_list.forEach(name => {
      canvas.addEventListener(name, (ev) => {
        _event['name'] = name;
        _event['clientWidth'] = canvas['clientWidth'];
        _event['clientHeight'] = canvas['clientHeight'];
        _event['offsetLeft'] = canvas['offsetLeft'];
        _event['offsetTop'] = canvas['offsetTop'];

        // _event['canvas'] = canvas;
        // _event['origin'] = ev;

        _event['clientX'] = 'ontouchstart' in window ? (ev["changedTouches"][0].clientX) : ev['clientX'];
        _event['clientY'] = 'ontouchstart' in window ? (ev["changedTouches"][0].clientY) : ev['clientY'];

        _event['webglX'] = -1.0 + 2.0 * (_event['clientX'] - canvas['offsetLeft']) / canvas['clientWidth'];
        _event['webglY'] = 1.0 - 2.0 * (_event['clientY'] - canvas['offsetTop']) / canvas['clientHeight'];

        if (name === 'mousedown' || name === 'touchstart') {
          this._drag = true;
        } else if (name === 'mouseup' || name === 'touchend') {
          this._drag = false;
        }

        _event['drag'] = this._drag;
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