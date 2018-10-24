import TimeInterpolator from "./TimeInterpolator";

/**
 * An interpolator where the rate of change starts out quickly and 
 * and then decelerates.
 * 减速
 */
export class DecelerateInterpolator extends TimeInterpolator {
  constructor(public mFactor: number = 1.0) {
    super()
  }

  getInterpolation(input: number) {

    let result;
    if (this.mFactor == 1.0) {
      result = (1.0 - (1.0 - input) * (1.0 - input));
    } else {
      result = (1.0 - Math.pow((1.0 - input), 2 * this.mFactor));
    }
    return result;
  }
}