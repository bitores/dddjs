import Node from '../Node';
import { Mat4 } from 'math/Mat4';
import { Vec3 } from 'math/Vec3';
export class Camera extends Node {
  _perspectMatrix: Mat4;
  constructor(public _name: string = "camera01", public _pos: Vec3 = new Vec3(0, 0, 0)) {
    super()
  }

  get className() {
    return 'Camera';
  }

  postion() {
    return this._pos;
  }


  clone() {
    return new Camera();
  }

  toString() {
    return `Camera()`
  }
}