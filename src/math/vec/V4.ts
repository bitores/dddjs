const V = require('./V.js');

class V4 extends V {
  constructor(x, y, z, w) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }
}

module.exports = V4;