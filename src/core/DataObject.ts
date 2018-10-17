import Node from '../Node';
import { Vec3 } from '../math/Vec3';

export class DataObject extends Node {
  _data: number[];
  _vertices: number[];
  _indices: number[];
  _colors: number[];
  constructor(_name: string, _pos: Vec3 = new Vec3(0, 0, 0)) {
    super(_name, _pos)
  }

  get vertices() {
    return this._vertices;
  }

  get indices() {
    return this._indices;
  }

  get color() {
    return this._colors;
  }
}