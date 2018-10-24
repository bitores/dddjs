import TimeInterpolator from "./TimeInterpolator";

/**
 * An interpolator where the change starts backward then flings forward and overshoots
 * the target value and finally goes back to the final value.
 * 反向加超越，先向相反方向改变，再加速播放，会超出目的值然后缓慢移动至目的值
 */
export class AnticipateOvershootInterpolator extends TimeInterpolator {
  public mTension: number = 0;
  constructor(tension: number = 2.0, extraTension: number = 1.5) {
    super()

    this.mTension = tension * extraTension;
  }

  a(t: number, s: number) {
    return t * t * ((s + 1) * t - s);
  }

  o(t: number, s: number) {
    return t * t * ((s + 1) * t + s);
  }

  getInterpolation(input: number) {

    if (input < 0.5) return 0.5 * this.a(input * 2.0, this.mTension);
    else return 0.5 * (this.o(input * 2.0 - 2.0, this.mTension) + 2.0);
  }
}