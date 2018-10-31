import Base from "../Base";

// webgl 颜色【0-1】，真【0-255】
export class Color extends Base {
  constructor(public r: number = 0, public g: number = 0, public b: number = 0, public a: number = 0) {
    super()
  }


  // rgba

  //

  clone() {
    return new Color(this.r, this.g, this.b, this.a);
  }

  toString() {
    return `Color(${this.r},${this.g},${this.b},${this.a})`;
  }
}