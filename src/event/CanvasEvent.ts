export class CanvasEvent {
  static eventName: string;
  static _event: Event | null = null;
  static _event_list: string[];
  static _drag: boolean = false;
  constructor(public canvas: HTMLCanvasElement) {
    if (this instanceof CanvasEvent === false) {
      return new CanvasEvent(canvas);
    }

    if (CanvasEvent._event === null) {

      CanvasEvent.eventName = 'webgl';
      this.createEvent()
      this.platformEvent();
      // this.listenUp()
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
        'mouseup',
        'mouseout'
      ];
    }
  }

  handleCommon(name, _event, canvas, ev) {
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
  }

  listen() {
    let canvas = this.canvas, _event = CanvasEvent._event;

    CanvasEvent._event_list.forEach(name => {
      canvas.addEventListener(name, (ev) => {
        if (_event === null) return;
        _event['name'] = name;
        this.handleCommon(name, _event, canvas, ev);

        if (name === 'mousedown' || name === 'touchstart') {
          CanvasEvent._drag = true;
          _event['webgldragend'] = false;
        } else if (name == "mouseout" || name === 'mouseup' || name === 'touchend') {
          CanvasEvent._drag = false;
          _event['webgldragend'] = true;
        } else if (Math.abs(_event['webglX']) > 1 || Math.abs(_event['webglY']) > 1) {
          // 检测 离开 元素
          CanvasEvent._drag = false;
          _event['webgldragend'] = true;
        } else {
          _event['webgldragend'] = false;
        }

        _event['webgldown'] = CanvasEvent._drag;
        _event['webgldrag'] = CanvasEvent._drag;
        canvas.dispatchEvent(_event)
      }, false);
    })

    document.addEventListener('keydown', (e) => {
      if (_event === null) return;
      _event['name'] = 'keydown';
      _event['webglkeydown'] = true;
      _event['webglkey'] = e.key;
      _event['webglkeyCode'] = e.keyCode || e.which || e.charCode;
      canvas.dispatchEvent(_event)
      _event['webglkeydown'] = false;
    })

    document.addEventListener('keyup', (e) => {
      if (_event === null) return;
      _event['name'] = 'keyup';
      _event['webglkeyup'] = true;
      _event['webglkey'] = e.key;
      _event['webglkeyCode'] = e.keyCode || e.which || e.charCode;
      canvas.dispatchEvent(_event)
      _event['webglkeyup'] = false;
    })


  }


  createEvent() {
    // 创建
    let ev = document.createEvent('HTMLEvents');
    // 初始化，事件类型，是否冒泡，是否阻止浏览器的默认行为
    ev.initEvent('webgl', false, true)
    //dfgdf
    ev["eventType"] = 'canvasevent';
    CanvasEvent._event = ev;
  }
}