import Node from '../Node';
import { Vec3 } from '../math/Vec3';

export class UIObject extends Node {
  _data: number[];
  private _vertices: number[];
  private _indices: number[];
  // _colors: number[];
  private x: number;
  private y: number;
  private width: number;
  private height: number;
  constructor(_name: string, x: number, y: number, w: number, h: number) {
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
    this._vertices = [
      -1 + this.x, 1 - this.y, 0,
      -1 + this.x + this.width, 1 - this.y, 0,
      -1 + this.x, 1 - (this.y + this.height), 0,
      -1 + this.x + this.width, 1 - (this.y + this.height), 0,
    ]

    this._indices = [
      1, 2, 0,
      1, 2, 3
    ]
  }
}