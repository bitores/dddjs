import { Animation } from './Animation';
import { Object3d } from '../core/Object3d';

// https://www.jianshu.com/p/2412d00a0ce4
export class TranslateAnimation extends Animation {
  xDeltaFrom: number = 0;// 初始值
  yDeltaFrom: number = 0;// 初始值
  xDeltaTo: number = 0;// 结束值
  yDeltaTo: number = 0;// 结束值

  xDelta: number | null = null;
  yDelta: number | null = null;
  constructor(target: Object3d, _canStop: boolean) {
    super(target, _canStop);
  }

  setAlpha(xDeltaFrom: number, yDeltaFrom: number, xDeltaTo: number, yDeltaTo: number) {
    this.xDeltaFrom = xDeltaFrom;
    this.yDeltaFrom = yDeltaFrom;
    this.xDeltaTo = xDeltaTo;
    this.yDeltaTo = yDeltaTo;
  }

  applyTransformation(interpolatedTime) {

    if (this.xDeltaFrom != this.xDeltaTo) {
      this.xDelta = this.xDeltaFrom + ((this.xDeltaTo - this.xDeltaFrom) * interpolatedTime);
    }
    if (this.yDeltaFrom != this.yDeltaTo) {
      this.yDelta = this.yDeltaFrom + ((this.yDeltaTo - this.yDeltaFrom) * interpolatedTime);
    }
  }

  getxDelta() {
    return this.xDelta;
  }

  getyelta() {
    return this.yDelta;
  }

  hasAlpha() {
    return true;
  }
}