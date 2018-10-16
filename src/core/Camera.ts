import Node from '../Node';
import { Mat4 } from '../math/Mat4';
import { Vec3 } from '../math/Vec3';
export class Camera extends Node {
  _perspectMatrix: Mat4;
  constructor(_name: string = "ddd-camera", _pos: Vec3 = new Vec3(0, 0, 0)) {
    super(_name, _pos);
  }

  get className() {
    return 'Camera';
  }

  clone() {
    return new Camera();
  }

  toString() {
    return `Camera()`
  }
}