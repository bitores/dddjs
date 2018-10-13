const V = require('./V.js');

class V2 extends V {
  constructor(x = 0, y = 0) {
    super();
    this.x = x;
    this.y = y;
  }

  add(x, y) {
    this.x += x;
    this.y += y;
    return this;
  }

  sub(x, y) {
    this.x -= x;
    this.y -= y;
    return this;
  }

  // 点乘-（内积）
  dot(v) {
    // 点乘:对应位一一相乘之后求和,结果是一个标量
    // 点乘的几何意义是可以用来表征或计算两个向量之间的夹角，以及在b向量在a向量方向上的投影
    return this.x * v.x + this.y * v.y;
  }

  // 叉乘-（叉积、外积、向量积）
  cross(x, y) {
    // 叉乘结果是一个向量
    // 叉乘几何意义1：aXb生成第三个垂直于a，b的法向量
    // 叉乘几何意义2：aXb等于由向量a和向量b构成的平行四边形的面积
    throw new Error('The cross function is not defined in vector 2x2')
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


  distance(x, y) {
    x -= this.x;
    y -= this.y;

    return Math.sqrt(x * x + y * y);
  }

}

module.exports = V2;