import Base from '../Base';
import { Mat4 } from './Mat4';
import { Vec3 } from './Vec3';
import { Euler } from './Euler';
// 四元素：常用的旋转表示方法便是四元数和欧拉角
// 若绕z-y-x轴的顺序旋转，欧拉角为yaw (ψ), pitch (θ) and roll (φ) 。
// 求出四元数q=(x,y,z,w),这里w为角度
// x2+y2+z2+w2=1
export class Quaternion extends Base {
  // ref https://www.3dgep.com/understanding-quaternions/
  // ref https://www.douban.com/note/537268961/

  constructor(public x: number = 0, public y: number = 0, public z: number = 0, public w: number = 1.0) {
    // quaternion 中 (x,y,z) 跟旋转轴有关, w 与绕旋转轴旋转的角度有关。
    // 对quaternion最大的误解在于认为w表示旋转角度，V表示旋转轴。正确的理解应该是w与旋转角度有关，v与旋转轴有关。
    super()
  }


  add() {

  }

  leftmul(bx: number = 0, by: number, bz: number, bw: number) {
    let ax = this.x, ay = this.y, az = this.z, aw = this.w;

    this.x = bx * aw + bw * ax + by * az - bz * ay;
    this.y = by * aw + bw * ay + bz * ax - bx * az;
    this.z = bz * aw + bw * az + bx * ay - by * ax;
    this.w = bw * aw - bx * ax - by * ay - bz * az;

    return this;
  }

  // 四元素的乘法－注意左乘和右乘是有区别的
  // 四元数的乘法的意义类似于矩阵的乘法，可以表示旋转的合成  
  // c=a*b (c,a,b∈Quaternion)可以理解为 ∠c=∠a+∠b 但是a*b 和b*a效果不一样的。
  mul(bx: number = 0, by: number, bz: number, bw: number) {
    let ax = this.x, ay = this.y, az = this.z, aw = this.w;

    this.x = ax * bw + aw * bx + ay * bz - az * by;
    this.y = ay * bw + aw * by + az * bx - ax * bz;
    this.z = az * bw + aw * bz + ax * by - ay * bx;
    this.w = aw * bw - ax * bx - ay * by - az * bz;

    return this;
  }

  dot(bx: number = 0, by: number, bz: number, bw: number) {
    // 点乘的结果，判断a和b对应欧拉角的关系 结果值f的范围为[-1,1]。
    // 当f=+(-)1时，q1和q2对应的欧拉角是相等的，即旋转状态是一致的。特别地，
    // 当f = -1时，说明其中一个rotation比另外一个rotation多旋转了360°。

    return this.x * bx + this.y * by + this.z * bz + this.w * bw;
  }

  private twoaxisrot(r11: number, r12: number, r21: number, r31: number, r32: number) {
    let x = Math.atan2(r11, r12);
    let y = Math.acos(r21);
    let z = Math.atan2(r31, r32);

    return new Euler(x, y, z)
  }

  private threeaxisrot(r11: number, r12: number, r21: number, r31: number, r32: number) {

    let x = Math.atan2(r31, r32);
    let y = Math.acos(r21);
    let z = Math.atan2(r11, r12);

    return new Euler(x, y, z)
  }

  // note: 
  // return values of res[] depends on rotSeq.
  // i.e.
  // for rotSeq zyx, 
  // x = res[0], y = res[1], z = res[2]
  // for rotSeq xyz
  // z = res[0], y = res[1], x = res[2]
  // ...
  toEuler(rotSeq: string) {
    // http://bediyap.com/programming/convert-quaternion-to-euler-rotations/
    let ret, x = this.x, y = this.y, z = this.z, w = this.w;
    switch (rotSeq) {
      case "zyx":
        ret = this.threeaxisrot(2 * (x * y + w * z),
          w * w + x * x - y * y - z * z,
          -2 * (x * z - w * y),
          2 * (y * z + w * x),
          w * w - x * x - y * y + z * z,
        );
        break;

      case "zyz":
        ret = this.twoaxisrot(2 * (y * z - w * x),
          2 * (x * z + w * y),
          w * w - x * x - y * y + z * z,
          2 * (y * z + w * x),
          -2 * (x * z - w * y),
        );
        break;

      case "zxy":
        ret = this.threeaxisrot(-2 * (x * y - w * z),
          w * w - x * x + y * y - z * z,
          2 * (y * z + w * x),
          -2 * (x * z - w * y),
          w * w - x * x - y * y + z * z,
        );
        break;

      case "zxz":
        ret = this.twoaxisrot(2 * (x * z + w * y),
          -2 * (y * z - w * x),
          w * w - x * x - y * y + z * z,
          2 * (x * z - w * y),
          2 * (y * z + w * x),
        );
        break;

      case "yxz":
        ret = this.threeaxisrot(2 * (x * z + w * y),
          w * w - x * x - y * y + z * z,
          -2 * (y * z - w * x),
          2 * (x * y + w * z),
          w * w - x * x + y * y - z * z,
        );
        break;

      case "yxy":
        ret = this.twoaxisrot(2 * (x * y - w * z),
          2 * (y * z + w * x),
          w * w - x * x + y * y - z * z,
          2 * (x * y + w * z),
          -2 * (y * z - w * x),
        );
        break;

      case "yzx":
        ret = this.threeaxisrot(-2 * (x * z - w * y),
          w * w + x * x - y * y - z * z,
          2 * (x * y + w * z),
          -2 * (y * z - w * x),
          w * w - x * x + y * y - z * z,
        );
        break;

      case "yzy":
        ret = this.twoaxisrot(2 * (y * z + w * x),
          -2 * (x * y - w * z),
          w * w - x * x + y * y - z * z,
          2 * (y * z - w * x),
          2 * (x * y + w * z),
        );
        break;

      case "xyz":
        ret = this.threeaxisrot(-2 * (y * z - w * x),
          w * w - x * x - y * y + z * z,
          2 * (x * z + w * y),
          -2 * (x * y - w * z),
          w * w + x * x - y * y - z * z,
        );
        break;

      case "xyx":
        ret = this.twoaxisrot(2 * (x * y + w * z),
          -2 * (x * z - w * y),
          w * w + x * x - y * y - z * z,
          2 * (x * y - w * z),
          2 * (x * z + w * y),
        );
        break;

      case "xzy":
        ret = this.threeaxisrot(2 * (y * z + w * x),
          w * w - x * x + y * y - z * z,
          -2 * (x * y - w * z),
          2 * (x * z + w * y),
          w * w + x * x - y * y - z * z,
        );
        break;

      case "xzx":
        ret = this.twoaxisrot(2 * (x * z - w * y),
          2 * (x * y + w * z),
          w * w + x * x - y * y - z * z,
          2 * (x * z + w * y),
          -2 * (x * y - w * z),
        );
        break;
      default:
        throw new Error("Unknown rotation sequence")
        break;
    }

    return ret;
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

    // // ??? 
    // //
    this.x = sx * cy * cz + cx * sy * sz;
    this.y = cx * sy * cz - sx * cy * sz;
    this.z = cx * cy * sz - sx * sy * cz;
    this.w = cx * cy * cz + sx * sy * sz;

    return this;
  }

  toMat4() {
    let x = this.x,
      y = this.y,
      z = this.z,
      w = this.w;

    return new Mat4(
      1 - 2 * y * y - 2 * z * z, 2 * x * y - 2 * z * w, 2 * x * z + 2 * y * w, 0,
      2 * x * y + 2 * z * w, 1 - 2 * x * x - 2 * z * z, 2 * y * z - 2 * x * w, 0,
      2 * x * z - 2 * y * w, 2 * y * z + 2 * x * w, 1 - 2 * x * x - 2 * y * y, 0,
      0, 0, 0, 1
    )
  }

  fromMat4(mat: Mat4) {
    // http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm
    let ele = mat.elements;
    let m00 = ele[0], m01 = ele[1], m02 = ele[2];
    let m10 = ele[4], m11 = ele[5], m12 = ele[6];
    let m20 = ele[8], m21 = ele[9], m22 = ele[10];
    // this.w = Math.sqrt(1 + a00 + a11 + a22) / 2.0;
    // this.x = (a21 - a12) / (4 * this.w);
    // this.y = (a02 - a20) / (4 * this.w);
    // this.z = (a10 - a01) / (4 * this.w);

    let tr = m00 + m11 + m22
    let qx, qy, qz, qw;
    if (tr > 0) {
      let S = Math.sqrt(tr + 1.0) * 2; // S=4*qw 
      qw = 0.25 * S;
      qx = (m21 - m12) / S;
      qy = (m02 - m20) / S;
      qz = (m10 - m01) / S;
    } else if ((m00 > m11) && (m00 > m22)) {
      let S = Math.sqrt(1.0 + m00 - m11 - m22) * 2; // S=4*qx 
      qw = (m21 - m12) / S;
      qx = 0.25 * S;
      qy = (m01 + m10) / S;
      qz = (m02 + m20) / S;
    } else if (m11 > m22) {
      let S = Math.sqrt(1.0 + m11 - m00 - m22) * 2; // S=4*qy
      qw = (m02 - m20) / S;
      qx = (m01 + m10) / S;
      qy = 0.25 * S;
      qz = (m12 + m21) / S;
    } else {
      let S = Math.sqrt(1.0 + m22 - m00 - m11) * 2; // S=4*qz
      qw = (m10 - m01) / S;
      qx = (m02 + m20) / S;
      qy = (m12 + m21) / S;
      qz = 0.25 * S;
    }

    this.x = qx;
    this.y = qy;
    this.z = qz;
    this.w = qw;

    return this;
  }

  fromAxisAngle(axis: Vec3, angle_in_rad: number) {
    // http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm
    var halfAngle = angle_in_rad / 2, s = Math.sin(halfAngle);

    this.x = axis.x * s;
    this.y = axis.y * s;
    this.z = axis.z * s;
    this.w = Math.cos(halfAngle);

    // this.onChangeCallback();
  }

  // for threejs
  setFromUnitVectors(vFrom, vTo) {

    var v1 = new Vec3();
    var r;

    var EPS = 0.000001;

    r = vFrom.dot(vTo) + 1;

    if (r < EPS) {

      r = 0;

      if (Math.abs(vFrom.x) > Math.abs(vFrom.z)) {

        v1.set(- vFrom.y, vFrom.x, 0);

      } else {

        v1.set(0, - vFrom.z, vFrom.y);

      }

    } else {

      v1 = vFrom.cross(vTo.x, vTo.y, vTo.z);

    }

    this.x = v1.x;
    this.y = v1.y;
    this.z = v1.z;
    this.w = r;

    return this.normalize();
  }

  static E() {
    return new Quaternion(0, 0, 0, 1);
  }

  static Zero() {
    return new Quaternion(0, 0, 0, 0);
  }

  identity() {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.w = 1;
    return this;
  }

  // q∗
  conjugate() {
    this.x *= -1;
    this.y *= -1;
    this.z *= -1;

    return this;
  }

  //|q|
  norm() {
    let x = this.x, y = this.y, z = this.z, w = this.w;
    return Math.sqrt(x * x + y * y + z * z + w * w);
  }

  normalize() {
    // q′
    let norm = this.norm();

    this.x /= norm;
    this.y /= norm;
    this.z /= norm;
    this.w /= norm;

    return this;
  }

  inverse() {
    //q−1
    this.conjugate();
    let norm = this.norm();

    let ret = norm * norm;

    this.x /= ret;
    this.y /= ret;
    this.z /= ret;
    this.w /= ret;

    return this;
  }

  empty() {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.w = 0;
    return this;
  }

  // --------  start
  trigger() {
    this._onChangeCallback();
  }

  onChange(callback) {
    this._onChangeCallback = callback;
  }

  _onChangeCallback() {

  }
  // ---------- end
  clone() {
    return new Quaternion(this.x, this.y, this.z, this.w);
  }

  toString() {
    return `Quaternion(${this.x},${this.y},${this.z},${this.w})`;
  }
}