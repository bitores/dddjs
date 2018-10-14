import Base from '../Base';
import { Mat4 } from 'math/Mat4';
import { Vec3 } from 'math/Vec3';
export class Camera extends Base {
  _perspectMatrix: Mat4;
  constructor(public _name: string = "camera01", public _pos: Vec3 = new Vec3(0, 0, 0)) {
    super()
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