import Base from '../Base';
import TimeInterpolator from './interpolator/TimeInterpolator';
import TypeEvaluator from './evaluator/TypeEvaluator';
export class Animation extends Base {
  protected _duratoin: number = 0;
  protected _startOffset: number = 0;
  protected _repeatCount: number = 0;
  protected _repeatMode: string = 'restart';// reverse表示倒序回放，restart表示从头播放

  protected _fillenable: boolean = true;
  protected _fillBefore: boolean = false;
  protected _fillAfter: boolean = true;



  protected _interplator: TimeInterpolator;
  protected _evaluator: TypeEvaluator;
  constructor() {
    super()
  }




  startAnimation(animation: Animation) {

  }

  setInterpolator(interplator: TimeInterpolator) {
    this._interplator = interplator;
  }

  // ...

  setTarget() {

  }

  init() {

  }

  start() {

  }

  pause() {

  }

  resume() {

  }

  stop() {
  }

  reset() {

  }

  repeate() {

  }

  isStart() {

  }

  isRunning() {

  }

  isStop() {

  }






  get className() {
    return 'Animation';
  }

  clone() {
    // return new UIShaderSource();
  }

  toString() {
    return '()';
  }
}