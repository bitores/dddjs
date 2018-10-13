const M = require('./m');

class M4 extends M {
  constructor(m44 = []) {
    super(m44);
    this._elements = [
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0
    ]
  }
}