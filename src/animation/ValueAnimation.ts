import { Animation } from './Animation';
import { Object3d } from '../core/Object3d';

// https://www.jianshu.com/p/2412d00a0ce4
export class ValueAnimation extends Animation {
  valueFrom: number = 0;// 初始值
  valueTo: number = 0;// 结束值

  value: number | null = null;
  constructor(target: Object3d, _canStop: boolean) {
    super(target, _canStop);
  }

  applyTransformation(interpolatedTime) {

    this.value = this.valueFrom + (this.valueTo - this.valueFrom) * interpolatedTime;
    return this
  }

  getValue() {
    return this.value;
  }
}