import TimeInterpolator from "./TimeInterpolator";

/**
 * An interpolator where the rate of change starts and ends slowly but
 * accelerates through the middle.
 * 先加速后减速的动画
 */
export class AccelerateDecelerateInterpolator extends TimeInterpolator {
  constructor() {
    super()
  }

  getInterpolation(input: number) {

    return (Math.cos((input + 1) * Math.PI) / 2.0) + 0.5;
  }
}