class V {
  constructor() {
    this._elements = [];
  }

  add() { }
  sub() { }
  dot() { }
  cross() { }

  negate() { }
  length() { }
  lengthSquared() { }
  normalize() { }
  distance() { }

  // 向量之间的角度
  angle(v: [V2, V3]) {
    let length1 = this.length(),
      length2 = v.length();

    if (length1 <= 1e-10 || length2 <= 1e-10) {
      return 0;
    }

    let dot = this.dot(v);

    return Math.acos(dot / (length1 * length2))

  }

  toString() {
    return JSON.stringify(this._elements)
  }
}


export default V;