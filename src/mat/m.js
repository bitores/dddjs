class M {
  constructor(arr) {
    this._elements = arr || [];
  }

  toString() {
    return JSON.stringify(this._elements);
  }
}