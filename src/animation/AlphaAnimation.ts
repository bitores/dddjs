import { Animation } from './Animation';
import { Object3d } from '../core/Object3d';

// https://www.jianshu.com/p/2412d00a0ce4
export class AlphaAnimation extends Animation {
  alphaFrom: number = 0;// 初始值
  alphaTo: number = 0;// 结束值

  alpha: number | null = null;
  constructor(target: Object3d, _canStop: boolean) {
    super(target, _canStop);
  }

  setAlpha(alphaFrom: number, alphaTo: number) {
    this.alphaFrom = alphaFrom;
    this.alphaTo = alphaTo;
  }

  applyTransformation(interpolatedTime) {

    this.alpha = this.alphaFrom + (this.alphaTo - this.alphaFrom) * interpolatedTime;
    return this
  }

  getAlpha() {
    return this.alpha;
  }

  hasAlpha() {
    return true;
  }
}