import Base from '../Base';
import { Vec3 } from './Vec3';
export class Mat4 extends Base {
  elements: number[];
  constructor(a: number = 0, b: number = 0, c: number = 0, d: number = 0,
    e: number = 0, f: number = 0, g: number = 0, h: number = 0,
    i: number = 0, j: number = 0, k: number = 0, l: number = 0,
    m: number = 0, n: number = 0, x: number = 0, y: number = 0) {
    super()
    this.elements = [
      a, b, c, d,
      e, f, g, h,
      i, j, k, l,
      m, n, x, y
    ]
  }

  get className() {
    return 'Vec4';
  }

  add(mat: Mat4) {
    let ele = this.elements,
      _ele = mat.elements;
    _ele.forEach((item, index) => {
      ele[index] += item;
    })
    return this;
  }
  sub(mat: Mat4) {
    let ele = this.elements,
      _ele = mat.elements;
    _ele.forEach((item, index) => {
      ele[index] -= item;
    })
    return this;
  }

  mul(mat: number) {
    let _ele = this.elements;

    _ele.forEach((item, index) => {
      _ele[index] *= mat;
    })

    return this;
  }

  dot(mat: Mat4) {
    let _ele = this.elements;

    let ele = mat.elements;
    let m1 = _ele[0], m2 = _ele[1], m3 = _ele[2], m4 = _ele[3],
      m5 = _ele[4], m6 = _ele[5], m7 = _ele[6], m8 = _ele[7],
      m9 = _ele[8], m10 = _ele[9], m11 = _ele[10], m12 = _ele[11],
      m13 = _ele[12], m14 = _ele[13], m15 = _ele[14], m16 = _ele[15];

    let n1 = ele[0], n2 = ele[1], n3 = ele[2], n4 = ele[3],
      n5 = ele[4], n6 = ele[5], n7 = ele[6], n8 = ele[7],
      n9 = ele[8], n10 = ele[9], n11 = ele[10], n12 = ele[11],
      n13 = ele[12], n14 = ele[13], n15 = ele[14], n16 = ele[15];

    _ele[0] = m1 * n1 + m2 * n5 + m3 * n9 + m4 * n13;
    _ele[1] = m1 * n2 + m2 * n6 + m3 * n10 + m4 * n14;
    _ele[2] = m1 * n3 + m2 * n7 + m3 * n11 + m4 * n15;
    _ele[3] = m1 * n4 + m2 * n8 + m3 * n12 + m4 * n16;
    _ele[4] = m5 * n1 + m6 * n5 + m7 * n9 + m8 * n13;
    _ele[5] = m5 * n2 + m6 * n6 + m7 * n10 + m8 * n14;
    _ele[6] = m5 * n3 + m6 * n7 + m7 * n11 + m8 * n15;
    _ele[7] = m5 * n4 + m6 * n8 + m7 * n12 + m8 * n16;
    _ele[8] = m9 * n1 + m10 * n5 + m11 * n9 + m12 * n13;
    _ele[9] = m9 * n2 + m10 * n6 + m11 * n10 + m12 * n14;
    _ele[10] = m9 * n3 + m10 * n7 + m11 * n11 + m12 * n15;
    _ele[11] = m9 * n4 + m10 * n8 + m11 * n12 + m12 * n16;
    _ele[12] = m13 * n1 + m14 * n5 + m15 * n9 + m16 * n13;
    _ele[13] = m13 * n2 + m14 * n6 + m15 * n10 + m16 * n14;
    _ele[14] = m13 * n3 + m14 * n7 + m15 * n11 + m16 * n15;
    _ele[15] = m13 * n4 + m14 * n8 + m15 * n12 + m16 * n16;

    return this;
  }

  div(mat: Mat4) {
    let ele = this.elements,
      _ele = mat.elements;
    _ele.forEach((item, index) => {
      ele[index] -= item;
    })
    return this;
  }

  // 单位
  static E() {
    return new Mat4(
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1);
  }

  // 零
  static Zero() {
    return new Mat4(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }

  identity() {
    this.elements = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1]
    return this;
  }

  empty() {
    this.elements = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    return this;
  }

  transpose() {
    let ele = this.elements;
    let l = ele[1],
      m = ele[2],
      n = ele[3],
      x = ele[6],
      y = ele[7],
      z = ele[11];

    ele[1] = ele[4];
    ele[2] = ele[8];
    ele[3] = ele[12];
    ele[6] = ele[9];
    ele[7] = ele[13];
    ele[11] = ele[14];

    ele[4] = l;
    ele[8] = m;
    ele[12] = n;
    ele[9] = x;
    ele[13] = y;
    ele[14] = z;

    return this;
  }

  // 矩阵的秩几何意义:无非就是变换后，还能保持非零体积的几何形状的最大维度
  // 矩阵的秩的定义:是其行向量或列向量的极大无关组中包含向量的个数。
  // 矩阵的秩:用初等行变换将矩阵A化为阶梯形矩阵, 则矩阵中非零行的个数就定义为这个矩阵的秩, 记为r(A);
  // 若矩阵秩等于行数，称为行满秩
  // 若矩阵秩等于列数，称为列满秩
  // 满秩矩阵是是判断一个矩阵是否可逆的充分必要条件
  rank() {

  }

  // 伴随，共轭 矩阵
  adjugate() {
    let ele = this.elements;
    let a00 = ele[0], a01 = ele[1], a02 = ele[2], a03 = ele[3];
    let a10 = ele[4], a11 = ele[5], a12 = ele[6], a13 = ele[7];
    let a20 = ele[8], a21 = ele[9], a22 = ele[10], a23 = ele[11];
    let a30 = ele[12], a31 = ele[13], a32 = ele[14], a33 = ele[15];


    ele[0] = (a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22));
    ele[1] = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
    ele[2] = (a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12));
    ele[3] = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
    ele[4] = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
    ele[5] = (a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22));
    ele[6] = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
    ele[7] = (a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12));
    ele[8] = (a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21));
    ele[9] = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
    ele[10] = (a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11));
    ele[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
    ele[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
    ele[13] = (a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21));
    ele[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
    ele[15] = (a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11));
    return this;
  }

  // 逆 矩阵
  // 行列式为0的矩阵，不可逆；行列式不为零的矩阵，可逆
  inverse() {
    let ele = this.elements;
    let a00 = ele[0], a01 = ele[1], a02 = ele[2], a03 = ele[3];
    let a10 = ele[4], a11 = ele[5], a12 = ele[6], a13 = ele[7];
    let a20 = ele[8], a21 = ele[9], a22 = ele[10], a23 = ele[11];
    let a30 = ele[12], a31 = ele[13], a32 = ele[14], a33 = ele[15];

    let b00 = a00 * a11 - a01 * a10;
    let b01 = a00 * a12 - a02 * a10;
    let b02 = a00 * a13 - a03 * a10;
    let b03 = a01 * a12 - a02 * a11;
    let b04 = a01 * a13 - a03 * a11;
    let b05 = a02 * a13 - a03 * a12;
    let b06 = a20 * a31 - a21 * a30;
    let b07 = a20 * a32 - a22 * a30;
    let b08 = a20 * a33 - a23 * a30;
    let b09 = a21 * a32 - a22 * a31;
    let b10 = a21 * a33 - a23 * a31;
    let b11 = a22 * a33 - a23 * a32;

    // Calculate the determinant
    let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) {
      console.log('error: det is 0')
      return null;
    }
    det = 1.0 / det;

    ele[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    ele[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    ele[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    ele[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    ele[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    ele[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    ele[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    ele[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    ele[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    ele[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    ele[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    ele[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    ele[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    ele[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    ele[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    ele[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

    return this;
  }

  // 行列式
  det() {
    let ele = this.elements;
    let a00 = ele[0], a01 = ele[1], a02 = ele[2], a03 = ele[3];
    let a10 = ele[4], a11 = ele[5], a12 = ele[6], a13 = ele[7];
    let a20 = ele[8], a21 = ele[9], a22 = ele[10], a23 = ele[11];
    let a30 = ele[12], a31 = ele[13], a32 = ele[14], a33 = ele[15];

    let r00 = a00 * a11 - a01 * a10;
    let r01 = a00 * a12 - a02 * a10;
    let r02 = a00 * a13 - a03 * a10;
    let r03 = a01 * a12 - a02 * a11;
    let r04 = a01 * a13 - a03 * a11;
    let r05 = a02 * a13 - a03 * a12;
    let r06 = a20 * a31 - a21 * a30;
    let r07 = a20 * a32 - a22 * a30;
    let r08 = a20 * a33 - a23 * a30;
    let r09 = a21 * a32 - a22 * a31;
    let r10 = a21 * a33 - a23 * a31;
    let r11 = a22 * a33 - a23 * a32;

    return r00 * r11 - r01 * r10 + r02 * r09 + r03 * r08 - r04 * r07 + r05 * r06;
  }

  // https://blog.csdn.net/gggg_ggg/article/details/45969499
  // 正交投影
  // Orthographic projection
  static orthographicLRTBNF(left: number, right: number, top: number, bottom: number, near: number, far: number, isRightHand: boolean = true) {
    // x [left, right] 映射 [-1,1]
    // y [bottom, top] 映射 [-1,1]
    // z [near, far] 映射 [ 0,1] -- near < far右手坐标系统
    let mat = new Mat4();
    let n = isRightHand ? near : far,
      f = isRightHand ? far : near;
    mat.elements = [
      2 / (right - left), 0, 0, -(right + left) / (right - left),
      0, 2 / (top - bottom), 0, -(top + bottom) / (top - bottom),
      0, 0, 1 / (f - n), -n / (f - n),
      0, 0, 0, 1
    ]

    return mat;
  }

  static orthographicWHNF(w: number, h: number, near: number, far: number, isRightHand: boolean = true) {
    // x [left, right] 映射 [-1,1]
    // y [bottom, top] 映射 [-1,1]
    // z [near, far] 映射 [ 0,1] -- near < far右手坐标系统
    let mat = new Mat4();
    let n = isRightHand ? near : far,
      f = isRightHand ? far : near;
    mat.elements = [
      2 / w, 0, 0, 0,
      0, 2 / h, 0, 0,
      0, 0, 1 / (f - n), -n / (f - n),
      0, 0, 0, 1
    ]

    return mat;
  }

  // 透视变换 矩阵
  // perspective projection
  static perspective(fovy: number, aspect: number, near: number, far: number) {
    let f = 1.0 / Math.tan(fovy / 2.0),
      nf = 1.0 / (near - far);
    let mat = new Mat4();

    mat.elements = [
      f / aspect, 0, 0, 0,
      0, f, 0, 0,
      0, 0, (far + near) * nf, -1,
      0, 0, (2 * far * near) * nf, 0
    ]

    return mat;
  }


  view(eye: Vec3, target: Vec3, up: Vec3) {
    // 一 相机状态描述
    // 视点：相机在世界坐标中的位置 eye(eyeX, eyeY, eyeZ)
    // 观测点：被观察的目标点，指明相机的朝向 at(atX, atY, atZ)
    // 上方向：图像的上方向，指明相机以视线为轴的旋转角 up(upX, upY, upZ)
    // 二 相机坐标系
    // 定义： 以视点为原点，以视线为z轴负方向，x轴与y轴与图像的x,y轴平行。根据定义，首先可得出：
    // zAxis：-dir = eye - at = (eyeX - atX, eyeY - atY, eyeZ - atZ) 归一化 N(Nx, Ny, Nz)
    // xAxis：up X zAxis 归一化 U(Ux, Uy, Uz)
    // yAxis: zAxis X xAxis 归一化 V(Vx, Vy, Vz)
    let yAxis = up.clone();
    let zAxis = target.clone().sub(eye.x, eye.y, eye.z);
    let N = zAxis.clone().normalize();


    let xAxis = N.clone().cross(up.x, up.y, up.z);
    let U = xAxis.clone().normalize();

    let V = U.clone().cross(N.x, N.y, N.z);

    // 旋转的逆矩阵
    let r = new Mat4(
      U.x, U.y, U.z, 0,
      V.x, V.y, V.z, 0,
      -N.x, -N.y, -N.z, 0,
      0.0, 0.0, 0.0, 1.0
    )

    // 平移的逆矩阵
    let t = new Mat4(
      1.0, 0.0, 0.0, 0.0,
      0.0, 1.0, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      -eye.x, -eye.y, -eye.z, 1.0,
    )

    return r.clone().dot(t);
  }


  clone() {
    let _ele = this.elements;
    return new Mat4(..._ele);
  }

  toString() {
    return `Mat4(${JSON.stringify(this.elements)})`;
  }
}