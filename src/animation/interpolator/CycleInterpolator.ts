import TimeInterpolator from "./TimeInterpolator";

/**
 * Repeats the animation for a specified number of cycles. The
 * rate of change follows a sinusoidal pattern.
 * 动画循环播放特定次数，速率改变沿着正弦曲线
 */
export class CycleInterpolator extends TimeInterpolator {
  constructor(public mCycles: number = 0) {
    super()
  }

  getInterpolation(input: number) {

    return (Math.sin(2 * this.mCycles * Math.PI * input));
  }
}