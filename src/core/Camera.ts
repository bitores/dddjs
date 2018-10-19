import Node from '../Node';
import { Mat4 } from '../math/Mat4';
import { Vec3 } from '../math/Vec3';
export class Camera extends Node {
  _projectMatrix: Mat4; // 投影矩阵 - 正交投影|透视投影
  _viewMatrix: Mat4;
  // private isRightHand: boolean = false;
  constructor(_name: string = "ddd-camera", _pos: Vec3 = new Vec3(0, 0, 0)) {
    super(_name, _pos);
    this._viewMatrix = Mat4.view(_pos, new Vec3(0, 0, 500), new Vec3(0, 1, 0))
    this.isRightHand = false;
  }

  get className() {
    return 'Camera';
  }

  translateX(val: number) {
    this._viewMatrix.leftDot(Mat4.translation(val, 0, 0, this.isRightHand))
    return this;
  }

  translateY(val: number) {
    this._viewMatrix.leftDot(Mat4.translation(0, val, 0, this.isRightHand))
    return this;
  }

  translateZ(val: number) {
    this._viewMatrix.leftDot(Mat4.translation(0, 0, val, this.isRightHand))
    return this;
  }

  rotateX(val: number) {
    this._viewMatrix.leftDot(Mat4.rotation(val, 1, 0, 0, this.isRightHand))
    return this;
  }

  rotateY(val: number) {
    this._viewMatrix.leftDot(Mat4.rotation(val, 0, 1, 0, this.isRightHand))
    return this;
  }

  rotateZ(val: number) {
    this._viewMatrix.leftDot(Mat4.rotation(val, 0, 0, 1, this.isRightHand))
    return this;
  }

  scaleX(val: number) {
    this._viewMatrix.leftDot(Mat4.scaling(val, 1, 1))
    return this;
  }
  scaleY(val: number) {
    this._viewMatrix.leftDot(Mat4.scaling(1, val, 1))
    return this;
  }
  scaleZ(val: number) {
    this._viewMatrix.leftDot(Mat4.scaling(1, 1, val))
    return this;
  }

  clone() {
    return new Camera();
  }

  toString() {
    return `Camera()`
  }
}