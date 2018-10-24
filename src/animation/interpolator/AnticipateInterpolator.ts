import TimeInterpolator from "./TimeInterpolator";

/**
 * An interpolator where the change starts backward then flings forward.
 * 反向 ，先向相反方向改变一段再加速播放
 */
export class AnticipateInterpolator extends TimeInterpolator {
  constructor(public mTension: number = 2.0) {
    super()
  }

  getInterpolation(input: number) {

    return input * input * ((this.mTension + 1) * input - this.mTension);
  }
}