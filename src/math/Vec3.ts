import Base from '../Base';
export class Vec3 extends Base {
  constructor(public x: number = 0, public y: number = 0, public z: number = 0) {
    super()
  }

  get className() {
    return 'Vec3';
  }

  set(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }

  copy(x: number, y: number, z: number) {
    return this.set(x, y, z);
  }

  add(x: number, y: number, z: number) {
    this.x += x;
    this.y += y;
    this.z += z;
    return this;
  }

  sub(x: number, y: number, z: number) {
    this.x -= x;
    this.y -= y;
    this.z -= z;
    return this;
  }

  // 数乘
  mul(v: number) {

    this.x *= v;
    this.y *= v;
    this.z *= v;
    return this;
  }

  // 点乘-（内积）
  dot(x: number, y: number, z: number) {
    // 点乘:对应位一一相乘之后求和,结果是一个标量
    // 点乘的几何意义是可以用来表征或计算两个向量之间的夹角，以及在b向量在a向量方向上的投影
    return this.x * x + this.y * y + this.z * z;
  }

  // 叉乘-（叉积、外积、向量积）
  cross(x: number, y: number, z: number) {
    // 叉乘结果是一个向量
    // 叉乘几何意义1：aXb生成第三个垂直于a，b的法向量
    // 叉乘几何意义2：aXb等于由向量a和向量b构成的平行四边形的面积
    let a = this.y * z - this.z * y,
      b = this.z * x - this.x * z,
      c = this.x * y - this.y * x;

    this.x = a;
    this.y = b;
    this.z = c;

    return this;
  }

  static get E() {
    return new Vec3(1, 1, 1)
  }

  static get Zero() {
    return new Vec3(0, 0, 0)
  }

  negate() {
    this.x *= -1;
    this.y *= -1;
    this.z *= -1;
    return this;
  }

  normalize() {
    let length = this.length();
    if (length !== 0) {
      this.x /= length;
      this.y /= length;
      this.z /= length;
    }
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

  distance(x: number, y: number, z: number) {
    x -= this.x;
    y -= this.y;
    z -= this.z

    return Math.sqrt(x * x + y * y + z * z);
  }

  // 向量之间的角度
  angle(v: Vec3) {
    let length1 = this.length(),
      length2 = v.length();

    if (length1 <= 1e-10 || length2 <= 1e-10) {
      return 0;
    }

    let dot = this.dot(v.x, v.y, v.z);

    return Math.acos(dot / (length1 * length2))
  }

  //-------- start

  fromQuaternion(qx: number, qy: number, qz: number, qw: number) {
    var x = this.x, y = this.y, z = this.z;

    // calculate quat * vector

    var ix = qw * x + qy * z - qz * y;
    var iy = qw * y + qz * x - qx * z;
    var iz = qw * z + qx * y - qy * x;
    var iw = - qx * x - qy * y - qz * z;

    // calculate result * inverse quat

    this.x = ix * qw + iw * - qx + iy * - qz - iz * - qy;
    this.y = iy * qw + iw * - qy + iz * - qx - ix * - qz;
    this.z = iz * qw + iw * - qz + ix * - qy - iy * - qx;

    return this;
  }

  trigger() {
    this._onChangeCallback();
  }

  onChange(callback) {
    this._onChangeCallback = callback;
  }

  _onChangeCallback() {

  }

  //--------  end

  clone() {
    return new Vec3(this.x, this.y, this.z);
  }

  toString() {
    return `Vec3(${this.x},${this.y},${this.z})`
  }
}