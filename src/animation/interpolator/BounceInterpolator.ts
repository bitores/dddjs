import TimeInterpolator from "./TimeInterpolator";

/**
 * An interpolator where the change bounces at the end.
 * 跳跃，快到目的值时值会跳跃，如目的值100，后面的值可能依次为85，77，70，80，90，100
 */
export class BounceInterpolator extends TimeInterpolator {
  constructor(public mTension: number = 0.2) {
    super()
  }

  bounce(input: number) {
    return input * input * 8.0;
  }

  getInterpolation(input: number) {
    input *= 1.1226;
    if (input < 0.3535) return this.bounce(input);
    else if (input < 0.7408) return this.bounce(input - 0.54719) + 0.7;
    else if (input < 0.9644) return this.bounce(input - 0.8526) + 0.9;
    else return this.bounce(input - 1.0435) + 0.95;
  }
}