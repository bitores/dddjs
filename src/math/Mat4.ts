import Base from '../Base';
export class Mat4 extends Base {
  elements: number[];
  constructor(a: number = 0, b: number = 0, c: number = 0, d: number = 0,
    e: number = 0, f: number = 0, g: number = 0, h: number = 0,
    i: number = 0, j: number = 0, k: number = 0, l: number = 0) {
    super()
    this.elements = [
      a, b, c, d,
      e, f, g, h,
      i, j, k, l
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

  mul(mat: Mat4 | number) {
    let _ele = this.elements;
    if (mat instanceof Mat4) {
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

    } else {
      _ele.forEach((item, index) => {
        _ele[index] *= mat;
      })
    }
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

  inverse() {

  }

  clone() {
    let _ele = this.elements;
    return new Mat4(..._ele);
  }

  toString() {
    return `(${JSON.stringify(this.elements)})`;
  }
}