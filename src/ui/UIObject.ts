import Node from '../Node';
import { Vec3 } from '../math/Vec3';

export class UIObject extends Node {
  _data: number[];
  private _vertices: Float32Array;
  private _indices: Uint16Array;
  // _colors: number[];
  private x: number;
  private y: number;
  private width: number;
  private height: number;
  constructor(x: number, y: number, w: number, h: number, _name: string = 'ui-obj') {
    super(_name, new Vec3(x, y, 0))
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;

    this.calc()
  }

  get vertices() {
    return this._vertices;
  }

  get indices() {
    return this._indices;
  }

  calc() {
    this._vertices = new Float32Array([
      -1 + this.x, 1 - this.y, 0,
      -1 + this.x + this.width, 1 - this.y, 0,
      -1 + this.x, 1 - (this.y + this.height), 0,
      -1 + this.x + this.width, 1 - (this.y + this.height), 0,
    ])

    this._indices = new Uint16Array([
      1, 2, 0,
      1, 2, 3
    ])
  }
}