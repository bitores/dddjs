import Base from "../Base";

export class Color extends Base {
  constructor(public r: number = 0, public g: number = 0, public b: number = 0, public a: number = 0) {
    super()
  }








  get className() {
    return 'Color';
  }

  clone() {
    return new Color(this.r, this.g, this.b, this.a);
  }

  toString() {
    return `Color(${this.r},${this.g},${this.b},${this.a})`;
  }
}