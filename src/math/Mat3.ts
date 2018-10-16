import Base from '../Base';
// 矩阵：如 n x n 矩阵， 表示 n维空间到n维空间的线性变换
export class Mat3 extends Base {
  elements: number[];
  constructor(a: number = 0, b: number = 0, c: number = 0,
    d: number = 0, e: number = 0, f: number = 0,
    g: number = 0, h: number = 0, i: number = 0) {
    super()
    this.elements = [
      a, b, c,
      d, e, f,
      g, h, i
    ]
  }

  get className() {
    return 'Vec3';
  }

  add(mat: Mat3) {
    let ele = this.elements,
      _ele = mat.elements;
    _ele.forEach((item, index) => {
      ele[index] += item;
    })
    return this;
  }
  sub(mat: Mat3) {
    let ele = this.elements,
      _ele = mat.elements;
    _ele.forEach((item, index) => {
      ele[index] -= item;
    })
    return this;
  }

  mul(mat: Mat3 | number) {
    let _ele = this.elements;
    if (mat instanceof Mat3) {
      let ele = mat.elements;
      let m1 = _ele[0], m2 = _ele[1], m3 = _ele[2],
        m4 = _ele[3], m5 = _ele[4], m6 = _ele[5],
        m7 = _ele[6], m8 = _ele[7], m9 = _ele[8];

      let n1 = ele[0], n2 = ele[1], n3 = ele[2],
        n4 = ele[3], n5 = ele[4], n6 = ele[5],
        n7 = ele[6], n8 = ele[7], n9 = ele[8];

      _ele[0] = m1 * n1 + m2 * n4 + m3 * n7;
      _ele[1] = m1 * n2 + m2 * n5 + m3 * n8;
      _ele[2] = m1 * n3 + m2 * n6 + m3 * n9;
      _ele[3] = m4 * n1 + m5 * n4 + m6 * n7;
      _ele[4] = m4 * n2 + m5 * n5 + m6 * n8;
      _ele[5] = m4 * n3 + m5 * n6 + m6 * n9;
      _ele[6] = m7 * n1 + m8 * n4 + m9 * n7;
      _ele[7] = m7 * n2 + m8 * n5 + m9 * n8;
      _ele[8] = m7 * n3 + m8 * n6 + m9 * n9;

    } else {
      _ele.forEach((item, index) => {
        _ele[index] *= mat;
      })
    }
    return this;
  }

  div(mat: Mat3) {
    let ele = this.elements,
      _ele = mat.elements;
    _ele.forEach((item, index) => {
      ele[index] -= item;
    })
    return this;
  }
  // 单位
  static get E() {
    return new Mat3(1, 0, 0, 0, 1, 0, 0, 0, 1);
  }

  // 零
  static get Zero() {
    return new Mat3(0, 0, 0, 0, 0, 0, 0, 0, 0);
  }

  identity() {
    this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1]
    return this;
  }

  empty() {
    this.elements = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    return this;
  }

  // 转置
  transpose() {
    let ele = this.elements;
    let l = ele[1],
      m = ele[2],
      n = ele[5];

    ele[1] = ele[3];
    ele[2] = ele[6];
    ele[5] = ele[7];

    ele[3] = l;
    ele[6] = m;
    ele[7] = n;

    return this;
  }


  // 傅里叶变换其实也是线性变换


  // 矩阵的秩几何意义:无非就是变换后，还能保持非零体积的几何形状的最大维度
  // 矩阵的秩的定义:是其行向量或列向量的极大无关组中包含向量的个数。
  // 矩阵的秩:用初等行变换将矩阵A化为阶梯形矩阵, 则矩阵中非零行的个数就定义为这个矩阵的秩, 记为r(A);
  // 若矩阵秩等于行数，称为行满秩
  // 若矩阵秩等于列数，称为列满秩
  // 满秩矩阵是是判断一个矩阵是否可逆的充分必要条件
  rank() {

  }

  // 伴随，共轭 矩阵A*
  adjugate() {
    // 矩阵的代数余子式：划去任意选定的k行、k列后
    // 矩阵的代数余子式 求伴随矩阵
    // 代数余子式计算行列式是降阶法的一个应用,能简化它的计算
    // A^(-1)=A*/|A|
    let ele = this.elements;
    let a00 = ele[0], a01 = ele[1], a02 = ele[2];
    let a10 = ele[3], a11 = ele[4], a12 = ele[5];
    let a20 = ele[6], a21 = ele[7], a22 = ele[8];

    ele[0] = (a11 * a22 - a12 * a21);
    ele[1] = (a02 * a21 - a01 * a22);
    ele[2] = (a01 * a12 - a02 * a11);
    ele[3] = (a12 * a20 - a10 * a22);
    ele[4] = (a00 * a22 - a02 * a20);
    ele[5] = (a02 * a10 - a00 * a12);
    ele[6] = (a10 * a21 - a11 * a20);
    ele[7] = (a01 * a20 - a00 * a21);
    ele[8] = (a00 * a11 - a01 * a10);

    return this;
  }

  // 逆 矩阵-其实矩阵的逆矩阵也跟倒数的性质一样:为什么我们需要矩阵的逆呢？主要原因是：矩阵没办法被除
  // https://www.sohu.com/a/226465524_224832
  // 行列式为0的矩阵，不可逆；行列式不为零的矩阵，可逆
  inverse() {
    let ele = this.elements;
    let a00 = ele[0], a01 = ele[1], a02 = ele[2];
    let a10 = ele[3], a11 = ele[4], a12 = ele[5];
    let a20 = ele[6], a21 = ele[7], a22 = ele[8];

    let b01 = a22 * a11 - a12 * a21;
    let b11 = -a22 * a10 + a12 * a20;
    let b21 = a21 * a10 - a11 * a20;

    // Calculate the determinant
    let det = a00 * b01 + a01 * b11 + a02 * b21;

    if (!det) {
      return null;
    }
    det = 1.0 / det;

    ele[0] = b01 * det;
    ele[1] = (-a22 * a01 + a02 * a21) * det;
    ele[2] = (a12 * a01 - a02 * a11) * det;
    ele[3] = b11 * det;
    ele[4] = (a22 * a00 - a02 * a20) * det;
    ele[5] = (-a12 * a00 + a02 * a10) * det;
    ele[6] = b21 * det;
    ele[7] = (-a21 * a00 + a01 * a20) * det;
    ele[8] = (a11 * a00 - a01 * a10) * det;
    return this;
  }
  // 行（列）提取公因子；
  // 某一行（列）乘以一个常数加到另一行（列）；
  // 交换行（列）。 
  // 行列式的一些性质：|E|=1 
  // 行列式： 1、行列式就是线性变换下的图形面积或体积的伸缩因子
  //         2、构成的超平行多面体的有向面积或有向体积
  det() {
    let ele = this.elements;
    let r00 = ele[0], r01 = ele[1], r02 = ele[2];
    let r10 = ele[3], r11 = ele[4], r12 = ele[5];
    let r20 = ele[6], r21 = ele[7], r22 = ele[8];

    return r00 * (r22 * r11 - r12 * r21) + r01 * (-r22 * r10 + r12 * r20) + r02 * (r21 * r10 - r11 * r20);
  }

  clone() {
    let _ele = this.elements;
    return new Mat3(..._ele);
  }

  toString() {
    return `Mat3(${JSON.stringify(this.elements)})`;
  }
}