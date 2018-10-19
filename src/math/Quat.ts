import Base from '../Base';
import { Mat4 } from './Mat4';
// 四元素：常用的旋转表示方法便是四元数和欧拉角
// 若绕z-y-x轴的顺序旋转，欧拉角为yaw (ψ), pitch (θ) and roll (φ) 。
// 求出四元数q=(x,y,z,w),这里w为角度
// x2+y2+z2+w2=1
export class Quat extends Base {
  // ref https://www.3dgep.com/understanding-quaternions/
  // ref https://www.douban.com/note/537268961/

  constructor(public x: number = 0, public y: number = 0, public z: number = 0, public w: number = 0) {
    // quaternion 中 (x,y,z) 跟旋转轴有关, w 与绕旋转轴旋转的角度有关。
    // 对quaternion最大的误解在于认为w表示旋转角度，V表示旋转轴。正确的理解应该是w与旋转角度有关，v与旋转轴有关。
    super()
    // this.w = Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z))
  }

  get className() {
    return 'Quat';
  }

  add() {

  }

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

    return {
      x,
      y,
      z
    }
  }

  private threeaxisrot(r11: number, r12: number, r21: number, r31: number, r32: number) {

    let x = Math.atan2(r31, r32);
    let y = Math.acos(r21);
    let z = Math.atan2(r11, r12);
    return {
      x,
      y,
      z
    }
  }

  // note: 
  // return values of res[] depends on rotSeq.
  // i.e.
  // for rotSeq zyx, 
  // x = res[0], y = res[1], z = res[2]
  // for rotSeq xyz
  // z = res[0], y = res[1], x = res[2]
  // ...
  toEuler(q: Quat, rotSeq: string) {
    // http://bediyap.com/programming/convert-quaternion-to-euler-rotations/
    let ret = {};
    switch (rotSeq) {
      case "zyx":
        ret = this.threeaxisrot(2 * (q.x * q.y + q.w * q.z),
          q.w * q.w + q.x * q.x - q.y * q.y - q.z * q.z,
          -2 * (q.x * q.z - q.w * q.y),
          2 * (q.y * q.z + q.w * q.x),
          q.w * q.w - q.x * q.x - q.y * q.y + q.z * q.z,
        );
        break;

      case "zyz":
        ret = this.twoaxisrot(2 * (q.y * q.z - q.w * q.x),
          2 * (q.x * q.z + q.w * q.y),
          q.w * q.w - q.x * q.x - q.y * q.y + q.z * q.z,
          2 * (q.y * q.z + q.w * q.x),
          -2 * (q.x * q.z - q.w * q.y),
        );
        break;

      case "zxy":
        ret = this.threeaxisrot(-2 * (q.x * q.y - q.w * q.z),
          q.w * q.w - q.x * q.x + q.y * q.y - q.z * q.z,
          2 * (q.y * q.z + q.w * q.x),
          -2 * (q.x * q.z - q.w * q.y),
          q.w * q.w - q.x * q.x - q.y * q.y + q.z * q.z,
        );
        break;

      case "zxz":
        ret = this.twoaxisrot(2 * (q.x * q.z + q.w * q.y),
          -2 * (q.y * q.z - q.w * q.x),
          q.w * q.w - q.x * q.x - q.y * q.y + q.z * q.z,
          2 * (q.x * q.z - q.w * q.y),
          2 * (q.y * q.z + q.w * q.x),
        );
        break;

      case "yxz":
        ret = this.threeaxisrot(2 * (q.x * q.z + q.w * q.y),
          q.w * q.w - q.x * q.x - q.y * q.y + q.z * q.z,
          -2 * (q.y * q.z - q.w * q.x),
          2 * (q.x * q.y + q.w * q.z),
          q.w * q.w - q.x * q.x + q.y * q.y - q.z * q.z,
        );
        break;

      case "yxy":
        ret = this.twoaxisrot(2 * (q.x * q.y - q.w * q.z),
          2 * (q.y * q.z + q.w * q.x),
          q.w * q.w - q.x * q.x + q.y * q.y - q.z * q.z,
          2 * (q.x * q.y + q.w * q.z),
          -2 * (q.y * q.z - q.w * q.x),
        );
        break;

      case "yzx":
        ret = this.threeaxisrot(-2 * (q.x * q.z - q.w * q.y),
          q.w * q.w + q.x * q.x - q.y * q.y - q.z * q.z,
          2 * (q.x * q.y + q.w * q.z),
          -2 * (q.y * q.z - q.w * q.x),
          q.w * q.w - q.x * q.x + q.y * q.y - q.z * q.z,
        );
        break;

      case "yzy":
        ret = this.twoaxisrot(2 * (q.y * q.z + q.w * q.x),
          -2 * (q.x * q.y - q.w * q.z),
          q.w * q.w - q.x * q.x + q.y * q.y - q.z * q.z,
          2 * (q.y * q.z - q.w * q.x),
          2 * (q.x * q.y + q.w * q.z),
        );
        break;

      case "xyz":
        ret = this.threeaxisrot(-2 * (q.y * q.z - q.w * q.x),
          q.w * q.w - q.x * q.x - q.y * q.y + q.z * q.z,
          2 * (q.x * q.z + q.w * q.y),
          -2 * (q.x * q.y - q.w * q.z),
          q.w * q.w + q.x * q.x - q.y * q.y - q.z * q.z,
        );
        break;

      case "xyx":
        ret = this.twoaxisrot(2 * (q.x * q.y + q.w * q.z),
          -2 * (q.x * q.z - q.w * q.y),
          q.w * q.w + q.x * q.x - q.y * q.y - q.z * q.z,
          2 * (q.x * q.y - q.w * q.z),
          2 * (q.x * q.z + q.w * q.y),
        );
        break;

      case "xzy":
        ret = this.threeaxisrot(2 * (q.y * q.z + q.w * q.x),
          q.w * q.w - q.x * q.x + q.y * q.y - q.z * q.z,
          -2 * (q.x * q.y - q.w * q.z),
          2 * (q.x * q.z + q.w * q.y),
          q.w * q.w + q.x * q.x - q.y * q.y - q.z * q.z,
        );
        break;

      case "xzx":
        ret = this.twoaxisrot(2 * (q.x * q.z - q.w * q.y),
          2 * (q.x * q.y + q.w * q.z),
          q.w * q.w + q.x * q.x - q.y * q.y - q.z * q.z,
          2 * (q.x * q.z + q.w * q.y),
          -2 * (q.x * q.y - q.w * q.z),
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
    let a00 = ele[0], a01 = ele[1], a02 = ele[2];
    let a10 = ele[4], a11 = ele[5], a12 = ele[6];
    let a20 = ele[8], a21 = ele[9], a22 = ele[10];
    this.w = Math.sqrt(1 + a00 + a11 + a22) / 2.0;
    this.x = (a21 - a12) / (4 * this.w);
    this.y = (a02 - a20) / (4 * this.w);
    this.z = (a10 - a01) / (4 * this.w);

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

  clone() {
    return new Quat(this.x, this.y, this.z, this.w);
  }

  toString() {
    return `Quat(${this.x},${this.y},${this.z},${this.w})`;
  }
}