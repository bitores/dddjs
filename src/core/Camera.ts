import { Object3d } from './Object3d';
import { Mat4 } from '../math/Mat4';
import { Vec3 } from '../math/Vec3';
export class Camera extends Object3d {
  _projectMatrix: Mat4; // 投影矩阵 - 正交投影|透视投影
  _viewMatrix: Mat4;
  constructor(_name: string = "ddd-camera", _pos: Vec3 = new Vec3(0, 0, 0)) {
    super(_name, _pos);
    this.isRightHand = false;

    // 
    let vM = Mat4.view(_pos, new Vec3(0, 0, -500), new Vec3(0, 1, 0), this.isRightHand)
    this._viewMatrix = vM;

    this._modelMatrix.onChange(() => {
      let t = this._modelMatrix.inverse()
      if (t)
        this._viewMatrix = vM.clone().dot(t);
    })

  }

  get className() {
    return 'Camera';
  }

  // translateX(val: number) {
  //   this._viewMatrix.dot(Mat4.translation(val, 0, 0, this.isRightHand), this.isRightHand)
  //   return this;
  // }

  // translateY(val: number) {
  //   this._viewMatrix.dot(Mat4.translation(0, val, 0, this.isRightHand), this.isRightHand)
  //   return this;
  // }

  // translateZ(val: number) {
  //   this._viewMatrix.dot(Mat4.translation(0, 0, val, this.isRightHand), this.isRightHand)
  //   return this;
  // }

  // rotateX(val: number) {
  //   this._viewMatrix.dot(Mat4.rotation(val, 1, 0, 0, this.isRightHand), this.isRightHand)
  //   return this;
  // }

  // rotateY(val: number) {
  //   this._viewMatrix.dot(Mat4.rotation(val, 0, 1, 0, this.isRightHand), this.isRightHand)
  //   return this;
  // }

  // rotateZ(val: number) {
  //   this._viewMatrix.dot(Mat4.rotation(val, 0, 0, 1, this.isRightHand), this.isRightHand)
  //   return this;
  // }

  // scaleX(val: number) {
  //   this._viewMatrix.dot(Mat4.scaling(val, 1, 1))
  //   return this;
  // }
  // scaleY(val: number) {
  //   this._viewMatrix.dot(Mat4.scaling(1, val, 1))
  //   return this;
  // }
  // scaleZ(val: number) {
  //   this._viewMatrix.dot(Mat4.scaling(1, 1, val))
  //   return this;
  // }

  clone() {
    return new Camera();
  }

  toString() {
    return `Camera()`
  }
}