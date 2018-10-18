import Base from "./Base";
import { Vec3 } from "./math/Vec3";
import { Mat4 } from "./math/Mat4";

export default class Node extends Base {
  protected _name: string;
  protected _pos: Vec3;
  protected _children: Node[];
  protected _parent: Node | null;
  // _positon: Vec3 = new Vec3();
  // _scale: Vec3 = new Vec3(1, 1, 1);
  // _rotation: Vec3 = new Vec3();

  protected _modelMatrix: Mat4 = Mat4.E;

  constructor(_name: string, _pos: Vec3 = new Vec3(0, 0, 0)) {
    super()
    this._name = _name;
    this._pos = _pos;
  }

  get name() {
    return this._name;
  }

  get postion() {
    return this._pos;
  }

  set postion(pos: Vec3) {
    this._pos = pos;
  }

  get children() {
    return this._children;
  }

  get parent() {
    return this._parent;
  }

  get className() {
    return 'Node';
  }

  translateX(val: number) {
    this._modelMatrix.leftDot(Mat4.translation(val, 0, 0))
    return this;
  }

  translateY(val: number) {
    this._modelMatrix.leftDot(Mat4.translation(0, val, 0))
    return this;
  }

  translateZ(val: number) {
    this._modelMatrix.leftDot(Mat4.translation(0, 0, val))
    return this;
  }

  rotateX(val: number) {
    this._modelMatrix.leftDot(Mat4.rotation(val, 1, 0, 0))
    return this;
  }

  rotateY(val: number) {
    this._modelMatrix.leftDot(Mat4.rotation(val, 0, 1, 0))
    return this;
  }

  rotateZ(val: number) {
    this._modelMatrix.leftDot(Mat4.rotation(val, 0, 0, 1))
    return this;
  }

  scaleX(val: number) {
    this._modelMatrix.leftDot(Mat4.scaling(val, 1, 1))
    return this;
  }
  scaleY(val: number) {
    this._modelMatrix.leftDot(Mat4.scaling(1, val, 1))
    return this;
  }
  scaleZ(val: number) {
    this._modelMatrix.leftDot(Mat4.scaling(1, 1, val))
    return this;
  }

  forward() {
    return this;
  }

  backward() {
    return this;
  }


  clone() {
    return new Node('node');
  }

  toString() {
    return '()';
  }

}