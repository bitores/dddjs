import Base from '../Base';
export class Vec2 extends Base {
  constructor(public x: number = 0, public y: number = 0) {
    super()
  }

  get className() {
    return 'Vec2';
  }

  add(x: number, y: number) {
    this.x += x;
    this.y += y;
    return this;
  }

  sub(x: number, y: number) {
    this.x -= x;
    this.y -= y;
    return this;
  }

  // 乘
  mul(v: number | Vec2) {
    if (v instanceof Vec2) {
      // === dot
      this.x *= v.x;
      this.y *= v.y;
    } else {
      this.x *= v;
      this.y *= v;
    }

    return this;
  }

  // 点乘-（内积）
  dot(x: number, y: number) {
    // 点乘:对应位一一相乘之后求和,结果是一个标量
    // 点乘的几何意义是可以用来表征或计算两个向量之间的夹角，以及在b向量在a向量方向上的投影
    return this.x * x + this.y * y;
  }

  // 叉乘-（叉积、外积、向量积）
  cross(v: Vec2) {
    // 叉乘结果是一个向量
    // 叉乘几何意义1：aXb生成第三个垂直于a，b的法向量
    // 叉乘几何意义2：aXb等于由向量a和向量b构成的平行四边形的面积
    throw new Error('The cross function is not defined in vector 2x2')
  }

  static get E() {
    return new Vec2(1, 1)
  }

  static get Zero() {
    return new Vec2(0, 0)
  }

  // 
  negate() {
    this.x *= -1;
    this.y *= -1;
    return this;
  }

  normalize() {
    let length = this.length();
    if (length !== 0) {
      this.x /= length;
      this.y /= length;
    }
    return this;
  }

  // 模、长度
  length() {
    let x = this.x,
      y = this.y;
    return Math.sqrt(x * x + y * y);
  }

  lengthSquared() {
    let x = this.x,
      y = this.y;
    return x * x + y * y;
  }


  distance(x: number, y: number) {
    x -= this.x;
    y -= this.y;

    return Math.sqrt(x * x + y * y);
  }

  // 向量之间的角度
  angle(v: Vec2) {
    let length1 = this.length(),
      length2 = v.length();

    if (length1 <= 1e-10 || length2 <= 1e-10) {
      return 0;
    }

    let dot = this.dot(v.x, v.y);

    return Math.acos(dot / (length1 * length2))
  }

  clone() {
    return new Vec2(this.x, this.y);
  }

  toString() {
    return `Vec2(${this.x},${this.y})`;
  }
}