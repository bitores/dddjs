import TimeInterpolator from "./TimeInterpolator";

/**
 * An interpolator where the change flings forward and overshoots the last value
 * then comes back.
 * 超越，最后超出目的值然后缓慢改变到目的值
 */
export class OvershootInterpolator extends TimeInterpolator {
  constructor(public mTension: number = 0.2) {
    super()
  }

  getInterpolation(input: number) {
    input -= 1.0;
    return input * input * ((this.mTension + 1) * input + this.mTension) + 1.0;
  }
}