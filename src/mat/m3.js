const M = require('./m');

class M3 extends M {
  constructor(m33) {
    super(m33)
    this._elements = [
      0, 0, 0,
      0, 0, 0,
      0, 0, 0
    ]
  }
}