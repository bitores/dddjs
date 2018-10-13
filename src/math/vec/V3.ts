const V = require('./V.js');

class V3 extends V {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  add(x, y, z) {
    this.x += x;
    this.y += y;
    this.z += z;
    return this;
  }

  sub(x, y, z) {
    this.x -= x;
    this.y -= y;
    this.z -= z;
    return this;
  }

  // 点乘-（内积）
  dot(v) {
    // 点乘:对应位一一相乘之后求和,结果是一个标量
    // 点乘的几何意义是可以用来表征或计算两个向量之间的夹角，以及在b向量在a向量方向上的投影
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  // 叉乘-（叉积、外积、向量积）
  cross(x, y, z) {
    // 叉乘结果是一个向量
    // 叉乘几何意义1：aXb生成第三个垂直于a，b的法向量
    // 叉乘几何意义2：aXb等于由向量a和向量b构成的平行四边形的面积

    return this.y * z - this.z * y + this.z * x - this.x * z + this.x * y - this.y * x;
  }

  negate() {
    this.x *= -1;
    this.y *= -1;
    this.z *= -1;
    return this;
  }

  length() {
    let x = this.x,
      y = this.y,
      z = this.z;
    return Math.sqrt(x * x + y * y + z * z);
  }

  lengthSquared() {
    let x = this.x,
      y = this.y,
      z = this.z;
    return x * x + y * y + z * z;
  }

  distance(x, y) {
    x -= this.x;
    y -= this.y;
    z -= this.z

    return Math.sqrt(x * x + y * y + z * z);
  }



}

module.exports = V3;