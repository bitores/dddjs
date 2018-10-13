abstract class Base {
  public name: string;
  abstract toString(): string;
}

export class Vec2 extends Base {
  constructor(public x: number = 0, public y: number = 0) {
    super()
    this.name = "Vec2";
  }

  add(x: number, y: number) {
    this.x += x;
    this.y += y;
    return this;
  }

  toString() {
    return `(x=${this.x},y=${this.y})`;
  }
}