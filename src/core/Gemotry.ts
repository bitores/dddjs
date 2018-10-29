export class Gemotry {
  private _vertices: Float32Array;
  private _colors: Float32Array;
  private _textCoords: Float32Array;
  private _indices: Uint16Array;

  setVertices(data: number[] = []) {
    this._vertices = new Float32Array(data)
  }

  setColors(data: number[] = []) {
    this._colors = new Float32Array(data)
  }

  setTextCoords(data: number[] = []) {
    this._textCoords = new Float32Array(data)
  }

  setIndices(data: number[] = []) {
    this._indices = new Uint16Array(data)
  }



  get vertices() {
    return this._vertices;
  }

  get colors() {
    return this._colors;
  }

  get textCoords() {
    return this._textCoords;
  }

  get indeices() {
    return this._indices;
  }
}