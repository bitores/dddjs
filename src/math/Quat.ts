import Base from '../Base';
// 四元素：常用的旋转表示方法便是四元数和欧拉角
// 若绕z-y-x轴的顺序旋转，欧拉角为yaw (ψ), pitch (θ) and roll (φ) 。
// 求出四元数q=(x,y,z,w),这里w为角度
// x2+y2+z2+w2=1
export class Quat extends Base {
  constructor(public x: number = 0, public y: number = 0, public z: number = 0, public w: number = 0) {
    super()
    this.w = Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z))
  }

  get className() {
    return 'Quat';
  }

  add() {

  }

  // 四元数的乘法的意义类似于矩阵的乘法，可以表示旋转的合成
  mul(bx: number = 0, by: number, bz: number, bw: number) {
    let ax = this.x, ay = this.y, az = this.z, aw = this.w;

    this.x = ax * bw + aw * bx + ay * bz - az * by;
    this.y = ay * bw + aw * by + az * bx - ax * bz;
    this.z = az * bw + aw * bz + ax * by - ay * bx;
    this.w = aw * bw - ax * bx - ay * by - az * bz;

    return this;
  }

  fromEuler(pitch: number = 0, yaw: number = 0, roll: number = 0) {
    let halfToRad = 0.5 * Math.PI / 180.0;

    let halX = pitch * halfToRad, halY = yaw * halfToRad, halZ = roll * halfToRad;
    let sx = Math.sin(halX);
    let cx = Math.cos(halX);
    let sy = Math.sin(halY);
    let cy = Math.cos(halY);
    let sz = Math.sin(halZ);
    let cz = Math.cos(halZ);

    this.x = sx * cy * cz - cx * sy * sz;
    this.y = cx * sy * cz + sx * cy * sz;
    this.z = cx * cy * sz - sx * sy * cz;
    this.w = cx * cy * cz + sx * sy * sz;

    return this;
  }

  static E() {
    return new Quat(0, 0, 0, 1);
  }

  static Zero() {
    return new Quat(0, 0, 0, 0);
  }

  identity() {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.w = 1;
    return this;
  }

  empty() {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.w = 0;
    return this;
  }

  clone() {
    return new Quat(this.x, this.y, this.z, this.w);
  }

  toString() {
    return `Quat(${this.x},${this.y},${this.z},${this.w})`;
  }
}