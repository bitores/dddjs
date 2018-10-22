import Base from "../Base";

export class CanvasEvent extends Base {
  static eventName: string;
  static _event: Event | null = null;
  static _event_list: string[];
  static _drag: boolean = false;
  constructor(public canvas: HTMLCanvasElement) {
    super()
    if (this instanceof CanvasEvent === false) {
      return new CanvasEvent(canvas);
    }

    if (CanvasEvent._event === null) {

      CanvasEvent.eventName = 'webgl';
      this.createEvent()
      this.platformEvent();
    }
    this.listen()
  }

  platformEvent() {
    let mobile = 'ontouchstart' in window;
    if (mobile) {
      CanvasEvent._event_list = [
        'touchstart',
        'touchmove',
        'touchend'
      ]
    } else {
      CanvasEvent._event_list = [
        'mousedown',
        'mousemove',
        'mouseup'
      ];
    }
  }


  listen() {
    let canvas = this.canvas, _event = CanvasEvent._event;
    CanvasEvent._event_list.forEach(name => {
      canvas.addEventListener(name, (ev) => {
        if (_event === null) return;
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
          CanvasEvent._drag = true;
          _event['webglup'] = false;
        } else if (name === 'mouseup' || name === 'touchend') {
          CanvasEvent._drag = false;
          _event['webglup'] = true;
        } else {
          _event['webglup'] = false;
        }

        _event['webgldown'] = CanvasEvent._drag;
        _event['webgldrag'] = CanvasEvent._drag;
        canvas.dispatchEvent(_event)
      });

      document.addEventListener('mouseup', (ev) => {
        if (_event === null) return;
        _event['name'] = 'mouseup';
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

        _event['webglup'] = true;

        CanvasEvent._drag = false;
        _event['webgldown'] = CanvasEvent._drag;
        _event['webgldrag'] = CanvasEvent._drag;
        canvas.dispatchEvent(_event)
      })

      document.addEventListener('touchend', (ev) => {
        if (_event === null) return;
        _event['name'] = 'touchend';
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

        _event['webglup'] = true;

        CanvasEvent._drag = false;
        _event['webgldown'] = CanvasEvent._drag;
        _event['webgldrag'] = CanvasEvent._drag;
        canvas.dispatchEvent(_event)
      })
    })
  }

  // unlisten() {
  //   let canvas = this.canvas;
  //   CanvasEvent._event_list.forEach(name => {
  //     canvas.removeEventListener(name, this.handListener)
  //   })
  // }

  createEvent() {
    // 创建
    let ev = document.createEvent('HTMLEvents');
    // 初始化，事件类型，是否冒泡，是否阻止浏览器的默认行为
    ev.initEvent('webgl', false, true)
    //dfgdf
    ev["eventType"] = 'canvasevent';
    CanvasEvent._event = ev;
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