import Base from "../Base";
import { Vec3 } from "../math/Vec3";
import { Mat4 } from "../math/Mat4";
import { Quaternion } from "../math/Quaternion";
import { Euler } from "../math/Euler";

export class Object3d extends Base {
  protected _children: Node[];
  protected _parent: Node | null = null;
  public _position: Vec3 = new Vec3();
  public _scale: Vec3 = new Vec3(1, 1, 1);
  public _quaternion: Quaternion = new Quaternion();
  public _euler: Euler = new Euler();
  protected _modelMatrix: Mat4 = Mat4.E;
  protected isRightHand: boolean = true;
  constructor(public _name: string, _pos: Vec3 = new Vec3(0, 0, 0)) {
    super()
    this._position = _pos;
    this.isRightHand = true;

    this._position.onChange(() => {
      this._modelMatrix.compose(this._position, this._quaternion, this._scale).trigger()
    })

    this._scale.onChange(() => {
      this._modelMatrix.compose(this._position, this._quaternion, this._scale).trigger()
    })

    this._quaternion.onChange(() => {
      this._modelMatrix.compose(this._position, this._quaternion, this._scale).trigger()
    })

    this._euler.onChange(() => {
      let q = this._euler.quaternion();
      this._quaternion.mul(q.x, q.y, q.z, q.w).trigger()
    });
  }

  get name() {
    return this._name;
  }

  get position() {
    return this._position;
  }

  setPosition(x: number, y: number, z: number) {
    this._position.set(x, y, z).trigger()
  }

  translate(axis: Vec3, distance) {
    let qx = this._quaternion.x, qy = this._quaternion.y, qz = this._quaternion.z, qw = this._quaternion.w;
    let dis = axis.clone().fromQuaternion(qx, qy, qz, qw).mul(distance);
    this._position.add(dis.x, dis.y, dis.z).trigger();
    return this;
  }

  // 平移只在自己的轴上
  translateX(val: number) {
    return this.translate(new Vec3(1, 0, 0), val);
  }

  translateY(val: number) {
    return this.translate(new Vec3(0, 1, 0), val);
  }

  translateZ(val: number) {
    return this.translate(new Vec3(0, 0, 1), val);
  }

  scaling(x: number, y: number, z: number) {
    this._scale.x * x;
    this._scale.y * y;
    this._scale.z * z;
    this._scale.trigger()
    return this;
  }

  // 缩放只在自己轴上
  scaleX(val: number) {
    return this.scaling(val, 1, 1);
  }

  scaleY(val: number) {
    return this.scaling(1, val, 1);
  }

  scaleZ(val: number) {
    return this.scaling(1, 1, val);
  }

  rotate(axix: Vec3, angle_in_rad: number, onWorld: boolean = false) {
    // assumes axis is normalized
    let q = new Quaternion();
    q.fromAxisAngle(axix, angle_in_rad);
    if (onWorld) {
      this._quaternion.leftmul(q.x, q.y, q.z, q.w).trigger()
    } else {
      this._quaternion.mul(q.x, q.y, q.z, q.w).trigger()
    }

    return this;
  }

  // 
  rotateX(angle_in_rad: number, onWorld: boolean = false) {
    // assumes axis is normalized
    return this.rotate(new Vec3(1, 0, 0), angle_in_rad, onWorld)
  }

  rotateY(angle_in_rad: number, onWorld: boolean = false) {
    // assumes axis is normalized
    return this.rotate(new Vec3(0, 1, 0), angle_in_rad, onWorld)
  }

  rotateZ(angle_in_rad: number, onWorld: boolean = false) {
    // assumes axis is normalized
    return this.rotate(new Vec3(0, 0, 1), angle_in_rad, onWorld)
  }

  pitch(val: number) {
    this._euler.pitch = val;
    this._euler.trigger();
    return this;
  }

  yaw(val: number) {
    this._euler.yaw = val;
    this._euler.trigger();
    return this;
  }

  roll(val: number) {
    this._euler.roll = val;
    this._euler.trigger();
    return this;
  }

  lookAt(x: number, y: number, z: number) {

  }


  get className() {
    return 'Object3d';
  }

  clone() {
    return new Object3d('node');
  }

  toString() {
    return '()';
  }

}