import TimeInterpolator from "./TimeInterpolator";

/**
 * An interpolator where the rate of change is constant
 * 匀速
 */
export class LinearInterpolator extends TimeInterpolator {
  constructor() {
    super()
  }

  getInterpolation(input: number) {

    return input;
  }
}