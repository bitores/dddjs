import { Animation } from './Animation';

// https://www.jianshu.com/p/2412d00a0ce4
export class ValueAnimation extends Animation {
  valueFrom: number = 0;// 初始值
  valueTo: number = 0;// 结束值
  duration: number = 0;// 动画持续时间（ms），必须设置，动画才有效果
  startOffset: number = 0;// 动画延迟开始时间（ms）

  fillBefore: boolean = true // 动画播放完后，视图是否会停留在动画开始的状态，默认为true
  fillAfter: boolean = false // 动画播放完后，视图是否会停留在动画结束的状态，优先于fillBefore值，默认为false
  fillEnabled: boolean = true // 是否应用fillBefore值，对fillAfter值无影响，默认为true
  repeatMode: string = "restart" // 选择重复播放动画模式，restart代表正序重放，reverse代表倒序回放，默认为restart|
  repeatCount: number = 0 // 重放次数（所以动画的播放次数=重放次数+1），为infinite时无限重复
  interpolator: number;// 插值器，即影响动画的播放速度
  constructor() {
    super()
  }

  evaluate(fraction: number, startValue: number, endValue: number) {
    // 公式Vt = V0 + at
    return startValue + (endValue - startValue) * fraction;
  }

  start() {
    let start = new Date().getTime(),
      duration = this.duration,
      startOffset = this.startOffset, timer;
    timer = setInterval(() => {
      var delay = new Date().getTime() - start;
      if (delay < this.startOffset) return;
      else if (delay > duration) {
        clearInterval(timer);
        return;
      }

      let fraction = (delay - startOffset) * 1.0 / (duration - startOffset);

      let val = this.evaluate(fraction, this.valueFrom, this.valueTo);

      console.log(val)

    }, 100)
  }

  get className() {
    return 'ValueAnimation';
  }

  clone() {
    // return new UIShaderSource();
  }

  toString() {
    return '()';
  }
}