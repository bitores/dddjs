import Base from '../Base';
import { Vec3 } from './Vec3';
import { Mat3 } from './Mat3';
import { DEG2RAD } from '../tools/util'
import { Quaternion } from './Quaternion';

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



  copy(mat) {
    let _ele = this.elements,
      ele = mat.elements;
    let n1 = ele[0], n2 = ele[1], n3 = ele[2], n4 = ele[3],
      n5 = ele[4], n6 = ele[5], n7 = ele[6], n8 = ele[7],
      n9 = ele[8], n10 = ele[9], n11 = ele[10], n12 = ele[11],
      n13 = ele[12], n14 = ele[13], n15 = ele[14], n16 = ele[15];

    _ele[0] = n1;
    _ele[1] = n2;
    _ele[2] = n3;
    _ele[3] = n4;
    _ele[4] = n5;
    _ele[5] = n6;
    _ele[6] = n7;
    _ele[7] = n8;
    _ele[8] = n9;
    _ele[9] = n10;
    _ele[10] = n11;
    _ele[11] = n12;
    _ele[12] = n13;
    _ele[13] = n14;
    _ele[14] = n15;
    _ele[15] = n16;

    return this;
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

  dot(mat: Mat4, isRightHand: boolean = true) {
    if (isRightHand) {
      return this.rightDot(mat);
    } else {
      return this.leftDot(mat);
    }
  }

  leftDot(mat: Mat4) {
    let _ele = mat.elements;

    let ele = this.elements;
    let m1 = _ele[0], m2 = _ele[1], m3 = _ele[2], m4 = _ele[3],
      m5 = _ele[4], m6 = _ele[5], m7 = _ele[6], m8 = _ele[7],
      m9 = _ele[8], m10 = _ele[9], m11 = _ele[10], m12 = _ele[11],
      m13 = _ele[12], m14 = _ele[13], m15 = _ele[14], m16 = _ele[15];

    let n1 = ele[0], n2 = ele[1], n3 = ele[2], n4 = ele[3],
      n5 = ele[4], n6 = ele[5], n7 = ele[6], n8 = ele[7],
      n9 = ele[8], n10 = ele[9], n11 = ele[10], n12 = ele[11],
      n13 = ele[12], n14 = ele[13], n15 = ele[14], n16 = ele[15];

    ele[0] = m1 * n1 + m2 * n5 + m3 * n9 + m4 * n13;
    ele[1] = m1 * n2 + m2 * n6 + m3 * n10 + m4 * n14;
    ele[2] = m1 * n3 + m2 * n7 + m3 * n11 + m4 * n15;
    ele[3] = m1 * n4 + m2 * n8 + m3 * n12 + m4 * n16;
    ele[4] = m5 * n1 + m6 * n5 + m7 * n9 + m8 * n13;
    ele[5] = m5 * n2 + m6 * n6 + m7 * n10 + m8 * n14;
    ele[6] = m5 * n3 + m6 * n7 + m7 * n11 + m8 * n15;
    ele[7] = m5 * n4 + m6 * n8 + m7 * n12 + m8 * n16;
    ele[8] = m9 * n1 + m10 * n5 + m11 * n9 + m12 * n13;
    ele[9] = m9 * n2 + m10 * n6 + m11 * n10 + m12 * n14;
    ele[10] = m9 * n3 + m10 * n7 + m11 * n11 + m12 * n15;
    ele[11] = m9 * n4 + m10 * n8 + m11 * n12 + m12 * n16;
    ele[12] = m13 * n1 + m14 * n5 + m15 * n9 + m16 * n13;
    ele[13] = m13 * n2 + m14 * n6 + m15 * n10 + m16 * n14;
    ele[14] = m13 * n3 + m14 * n7 + m15 * n11 + m16 * n15;
    ele[15] = m13 * n4 + m14 * n8 + m15 * n12 + m16 * n16;

    return this;
  }

  rightDot(mat: Mat4) {
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
  static get E() {
    return new Mat4(
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1);
  }

  // 零
  static get Zero() {
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

  // 逆 矩阵-其实矩阵的逆矩阵也跟倒数的性质一样
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

  // 判断给点矩阵是否为反射形式
  isReflect() {
    // 如果对缩放矩阵s的一个或者三个分量置负，就会产生一个反射矩阵（镜像矩阵）
    // 需要计算该矩阵左上部3x3矩阵行列式的值，如果为负，那么该矩阵就为反射矩阵。
    let ele = this.elements;
    let mat = new Mat3(
      ele[0], ele[1], ele[2],
      ele[4], ele[5], ele[6],
      ele[8], ele[9], ele[10]
    )

    if (mat.det() < 0) true;

    return false;
  }

  // https://blog.csdn.net/gggg_ggg/article/details/45969499
  // 左手坐标系统 正交投影
  // Orthographic projection
  static orthographicLRTBNF(left: number, right: number, top: number, bottom: number, near: number, far: number, isRightHand: boolean = false) {
    // x [left, right] 映射 [-1,1]
    // y [bottom, top] 映射 [-1,1]
    // z [near, far] 映射 [ 0,1] 
    let mat = new Mat4();
    var x = 2 / (right - left);
    var y = 2 / (top - bottom);

    var a = -(right + left) / (right - left);
    var b = -(top + bottom) / (top - bottom);



    if (isRightHand) {
      // https://www.cnblogs.com/mazhenyu/p/6401683.html
      // 右手坐标系统 正交投影
      var c = -2 / (far - near);
      var d = - (far + near) / (far - near);

    } else {
      // https://blog.csdn.net/gggg_ggg/article/details/45969499
      // 左手坐标系统 正交投影
      var c = -1 / (far - near);
      var d = - near / (far - near);

    }

    mat.elements = [
      x, 0, 0, a,
      0, y, 0, b,
      0, 0, c, d,
      0, 0, 0, 1
    ]

    return mat;
  }

  // https://blog.csdn.net/gggg_ggg/article/details/45969499
  // 左手坐标系统 正交投影
  static orthographicWHNF(w: number, h: number, near: number, far: number) {
    // x [left, right] 映射 [-1,1]
    // y [bottom, top] 映射 [-1,1]
    // z [near, far] 映射 [ 0,1] -- near < far右手坐标系统
    let mat = new Mat4();
    let n = near,
      f = far;
    mat.elements = [
      2 / w, 0, 0, 0,
      0, 2 / h, 0, 0,
      0, 0, 1 / (f - n), -n / (f - n),
      0, 0, 0, 1
    ]

    return mat;
  }

  // https://blog.csdn.net/gggg_ggg/article/details/45969499
  // 左手坐标系统 透视投影
  static perspectiveLRTBNF(left, right, top, bottom, near, far, isRightHand: boolean = false) {
    let mat = new Mat4();
    var w = right - left;
    var h = top - bottom;
    var x = 2 * near / w;
    var y = 2 * near / h;

    var a = (right + left) / w;
    var b = (top + bottom) / h;

    if (isRightHand) {
      // https://www.cnblogs.com/mazhenyu/p/6401683.html
      // 右手坐标系统 透视投影
      var c = -(far + near) / (far - near);
      var d = - 2 * far * near / (far - near);
      var e = -1;
    } else {
      // https://blog.csdn.net/gggg_ggg/article/details/45969499
      // 左手坐标系统 透视投影
      var c = far / (far - near);
      var d = - far * near / (far - near);
      var e = 1;
    }

    mat.elements = [
      x, 0, a, 0,
      0, y, b, 0,
      0, 0, c, d,
      0, 0, e, 0
    ];
    return mat;
  }

  // https://blog.csdn.net/gggg_ggg/article/details/45969499
  // 左手坐标系统 透视投影
  static perspectiveWHNF(w: number = 1, h: number = 1, near: number = 1, far: number = 1000) {
    let mat = new Mat4();

    var x = 2 * near / w;
    var y = 2 * near / h;

    var c = far / (far - near);
    var d = -  far * near / (far - near);

    mat.elements = [
      x, 0, 0, 0,
      0, y, 0, 0,
      0, 0, c, d,
      0, 0, 1, 0
    ]

    return mat;
  }

  // https://blog.csdn.net/gggg_ggg/article/details/45969499
  // 左手坐标系统 透视投影
  static perspective(fovy: number = 45, aspect: number = 1, near: number = 0.1, far: number = 1000) {
    let mat = new Mat4();
    let f = Math.tan(2.0 / DEG2RAD(fovy));

    // cot(fov/2)/aspect = 2N/w = 2N/(h*aspect)
    // tan(2/fov) = 2N/h
    // fov = 2/atan(2n/h)
    // fov = 360/(pi*atan(2N/(h)))

    var c = far / (far - near);
    var d = -  far * near / (far - near);

    mat.elements = [
      f / aspect, 0, 0, 0,
      0, f, 0, 0,
      0, 0, c, d,
      0, 0, 1, 0
    ]

    return mat;
  }

  // 这个矩阵的推导方式也不止一种啦，得到的最终矩阵也未必相同的。总之它是不固定的，使用哪种推导过程要根据你的已知参数是什么来决定。不过很多库都有封装成类，而不是单一的函数。如果要开发3D项目，这个类是必封装的东西，要不然代码会凌乱死。
  static view(eye: Vec3 = new Vec3(0, 0, 0), target: Vec3 = new Vec3(0, 0, -1), up: Vec3 = new Vec3(0, 1, 0), isRightHand: boolean = true) {
    // https://www.cnblogs.com/wbaoqing/p/5422974.html
    // https://blog.csdn.net/xufeng0991/article/details/75949931
    // 一 相机状态描述
    // 视点：相机在世界坐标中的位置 eye(eyeX, eyeY, eyeZ)
    // 观测点：被观察的目标点，指明相机的朝向 at(atX, atY, atZ)
    // 上方向：图像的上方向，指明相机以视线为轴的旋转角 up(upX, upY, upZ)
    // 二 相机坐标系
    // 定义： 以视点为原点，以视线为z轴负方向，x轴与y轴与图像的x,y轴平行。根据定义，首先可得出：
    // zAxis：-dir = eye - at = (eyeX - atX, eyeY - atY, eyeZ - atZ) 归一化 N(Nx, Ny, Nz)
    // xAxis：up X zAxis 归一化 U(Ux, Uy, Uz)
    // yAxis: zAxis X xAxis 归一化 V(Vx, Vy, Vz)
    // let yAxis = up.clone();
    if (eye.x == target.x && eye.y == target.y && eye.z == target.z) { return Mat4.E }

    // 旋转矩阵是个正交矩阵，它的逆矩阵和转置矩阵一样
    if (isRightHand) {
      // 视线方向为 z 轴负方向， 
      let zAxis = eye.clone().sub(target.x, target.y, target.z);
      let NZ = zAxis.clone().normalize();

      let xAxis = up.clone().cross(NZ.x, NZ.y, NZ.z);
      let UX = xAxis.clone().normalize();

      let VY = NZ.clone().cross(UX.x, UX.y, UX.z);

      // 右手旋转的逆矩阵
      var r = new Mat4(
        UX.x, UX.y, UX.z, 0,
        VY.x, VY.y, VY.z, 0,
        NZ.x, NZ.y, NZ.z, 0,
        0.0, 0.0, 0.0, 1.0
      )

      // 右手平移的逆矩阵
      var t = new Mat4(
        1.0, 0.0, 0.0, -eye.x,
        0.0, 1.0, 0.0, -eye.y,
        0.0, 0.0, 1.0, -eye.z,
        0, 0, 0, 1.0,
      )

      return r.dot(t);
    } else {
      // 视线方向为 z 轴正方向， 
      let zAxis = target.clone().sub(eye.x, eye.y, eye.z);
      let NZ = zAxis.clone().normalize();

      let xAxis = NZ.clone().cross(up.x, up.y, up.z);
      let UX = xAxis.clone().normalize();

      let VY = UX.clone().cross(NZ.x, NZ.y, NZ.z);

      // 左手旋转的逆矩阵
      var r = new Mat4(
        UX.x, VY.x, NZ.x, 0,
        UX.y, VY.y, NZ.y, 0,
        UX.z, VY.z, NZ.z, 0,
        0.0, 0.0, 0.0, 1.0
      )

      // 左手平移的逆矩阵
      var t = new Mat4(
        1.0, 0.0, 0.0, 0,
        0.0, 1.0, 0.0, 0,
        0.0, 0.0, 1.0, 0,
        -eye.x, -eye.y, -eye.z, 1.0,
      )

      return t.dot(r);
    }
  }

  static translation(tx: number, ty: number, tz: number, isRightHand: boolean = true) {
    if (isRightHand) {
      // 右：右坐标系，右乘
      return new Mat4(
        1, 0, 0, tx,
        0, 1, 0, ty,
        0, 0, 1, tz,
        0, 0, 0, 1)
    }

    // 左：左坐标系，左乘
    return new Mat4(
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      tx, ty, tz, 1)
  }

  // angle 为弧度
  static rotation(angle_in_rad: number, x: number = 1, y: number = 0, z: number = 0, isRightHand: boolean = true) {
    let r = isRightHand ? 1 : -1;
    let cos = Math.cos(angle_in_rad), sin = Math.sin(angle_in_rad);
    if (x > 0) {
      return new Mat4(
        1, 0, 0, 0,
        0, cos, -r * sin, 0,
        0, r * sin, cos, 0,
        0, 0, 0, 1
      )
    } else if (y > 0) {
      return new Mat4(
        cos, 0, r * sin, 0,
        0, 1, 0, 0,
        -r * sin, 0, cos, 0,
        0, 0, 0, 1
      )
    } else if (z > 0) {
      return new Mat4(
        cos, -r * sin, 0, 0,
        r * sin, cos, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
      )
    } else {
      throw new Error("...xyz ")
    }
  }

  static scaling(x: number = 1, y: number = 1, z: number = 1) {
    return new Mat4(
      x, 0, 0, 0,
      0, y, 0, 0,
      0, 0, z, 0,
      0, 0, 0, 1
    )
  }

  static fromQuat(x: number, y: number, z: number, w: number) {
    let mat = new Mat4();
    var ele = mat.elements;

    var x2 = x + x, y2 = y + y, z2 = z + z;
    var xx = x * x2, xy = x * y2, xz = x * z2;
    var yy = y * y2, yz = y * z2, zz = z * z2;
    var wx = w * x2, wy = w * y2, wz = w * z2;

    ele[0] = (1 - (yy + zz));
    ele[1] = (xy + wz);
    ele[2] = (xz - wy);
    ele[3] = 0;

    ele[4] = (xy - wz);
    ele[5] = (1 - (xx + zz));
    ele[6] = (yz + wx);
    ele[7] = 0;

    ele[8] = (xz + wy);
    ele[9] = (yz - wx);
    ele[10] = (1 - (xx + yy));
    ele[11] = 0;

    ele[12] = 0;
    ele[13] = 0;
    ele[14] = 0;
    ele[15] = 1;

    return mat;
  }

  compose2(position: Vec3 = new Vec3(), quaternion: Quaternion = new Quaternion(), scale: Vec3 = new Vec3(), onWorld: boolean = false) {
    var x = quaternion.x, y = quaternion.y, z = quaternion.z, w = quaternion.w;
    var x2 = x + x, y2 = y + y, z2 = z + z;
    var xx = x * x2, xy = x * y2, xz = x * z2;
    var yy = y * y2, yz = y * z2, zz = z * z2;
    var wx = w * x2, wy = w * y2, wz = w * z2;

    var sx = scale.x, sy = scale.y, sz = scale.z;

    let rot = new Mat4(
      1 - (yy + zz), xy + wz, xz - wy, 0,
      xy - wz, 1 - (xx + zz), yz + wx, 0,
      xz + wy, yz - wx, 1 - (xx + yy), 0,
      0, 0, 0, 1
    )

    let scal = new Mat4(
      sx, 0, 0, 0,
      0, sy, 0, 0,
      0, 0, sz, 0,
      0, 0, 0, 1
    )

    let trans = new Mat4(
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      position.x, position.y, position.z, 1
    )

    if (onWorld) {
      //  公转
      scal.leftDot(rot).leftDot(trans)
    } else {
      //  自转
      scal.leftDot(trans).leftDot(rot)
    }

    this.copy(scal);

    return this;
  }

  compose(position: Vec3 = new Vec3(), quaternion: Quaternion = new Quaternion(), scale: Vec3 = new Vec3()) {
    var te = this.elements;

    var x = quaternion.x, y = quaternion.y, z = quaternion.z, w = quaternion.w;
    var x2 = x + x, y2 = y + y, z2 = z + z;
    var xx = x * x2, xy = x * y2, xz = x * z2;
    var yy = y * y2, yz = y * z2, zz = z * z2;
    var wx = w * x2, wy = w * y2, wz = w * z2;

    var sx = scale.x, sy = scale.y, sz = scale.z;

    te[0] = (1 - (yy + zz)) * sx;
    te[1] = (xy + wz) * sx;
    te[2] = (xz - wy) * sx;
    te[3] = 0;

    te[4] = (xy - wz) * sy;
    te[5] = (1 - (xx + zz)) * sy;
    te[6] = (yz + wx) * sy;
    te[7] = 0;

    te[8] = (xz + wy) * sz;
    te[9] = (yz - wx) * sz;
    te[10] = (1 - (xx + yy)) * sz;
    te[11] = 0;

    te[12] = position.x;
    te[13] = position.y;
    te[14] = position.z;
    te[15] = 1;

    return this;
  }

  decompose(position: Vec3 = new Vec3(), quaternion: Quaternion = new Quaternion(), scale: Vec3 = new Vec3()) {
    var te = this.elements;

    var sx = new Vec3(te[0], te[1], te[2]).length();
    var sy = new Vec3(te[4], te[5], te[6]).length();
    var sz = new Vec3(te[8], te[9], te[10]).length();

    // if determine is negative, we need to invert one scale
    var det = this.det();
    if (det < 0) sx = - sx;

    position.x = te[12];
    position.y = te[13];
    position.z = te[14];

    scale.x = sx;
    scale.y = sy;
    scale.z = sz;

    // scale the rotation part

    var invSX = 1 / sx;
    var invSY = 1 / sy;
    var invSZ = 1 / sz;

    let matrix = this.clone();

    matrix.elements[0] *= invSX;
    matrix.elements[1] *= invSX;
    matrix.elements[2] *= invSX;

    matrix.elements[4] *= invSY;
    matrix.elements[5] *= invSY;
    matrix.elements[6] *= invSY;

    matrix.elements[8] *= invSZ;
    matrix.elements[9] *= invSZ;
    matrix.elements[10] *= invSZ;

    quaternion.fromMat4(matrix);

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
  get className() {
    return 'Mat4';
  }

  clone() {
    let _ele = this.elements;
    return new Mat4(..._ele);
  }

  toString() {
    return `Mat4${JSON.stringify(this.elements)}`;
  }
}