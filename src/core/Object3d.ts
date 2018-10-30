import Base from "../Base";
import { Vec3 } from "../math/Vec3";
import { Mat4 } from "../math/Mat4";
import { Quaternion } from "../math/Quaternion";
import { Euler } from "../math/Euler";
import { UIMaterial } from "../materials/UIMaterial";
import { Gemotry } from "./Gemotry";

export class Object3d extends Base {
  public uuid: Symbol = Symbol('uuid');
  public _children: any = [];
  public _parent: any = null;
  public _position: Vec3 = new Vec3();
  public _scale: Vec3 = new Vec3(1, 1, 1);
  public _quaternion: Quaternion = new Quaternion();
  public _euler: Euler = new Euler();
  public _modelMatrix: Mat4 = Mat4.E;


  public _gemotry: Gemotry = new Gemotry();
  public _material: UIMaterial | null = null;


  protected isRightHand: boolean = true;
  public _transformOnWorld: boolean = false;// true 公转， false 自转
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

  setPosition(x: number = 0, y: number = 0, z: number = 0) {
    this._position.set(x, y, z).trigger()
  }

  translateOnAxis(axis: Vec3, distance) {
    let qx = this._quaternion.x, qy = this._quaternion.y, qz = this._quaternion.z, qw = this._quaternion.w;
    let dis = axis.clone().fromQuaternion(qx, qy, qz, qw).mul(distance);
    this._position.add(dis.x, dis.y, dis.z).trigger();
    return this;
  }

  // translate(x: number = 0, y: number = 0, z: number = 0) {
  //   let qx = this._quaternion.x, qy = this._quaternion.y, qz = this._quaternion.z, qw = this._quaternion.w;
  //   let Vx = new Vec3(1, 0, 0).fromQuaternion(qx, qy, qz, qw).mul(x);
  //   let Vy = new Vec3(0, 1, 0).fromQuaternion(qx, qy, qz, qw).mul(y);
  //   let Vz = new Vec3(0, 0, 1).fromQuaternion(qx, qy, qz, qw).mul(z);
  //   this._position.add(Vx.x, Vx.y, Vx.z).add(Vy.x, Vy.y, Vy.z).add(Vz.x, Vz.y, Vz.z).trigger();
  //   return this;
  // }

  // 平移只在自己的轴上
  translateX(val: number) {
    return this.translateOnAxis(new Vec3(1, 0, 0), val);
  }

  translateY(val: number) {
    return this.translateOnAxis(new Vec3(0, 1, 0), val);
  }

  translateZ(val: number) {
    return this.translateOnAxis(new Vec3(0, 0, 1), val);
  }

  scaling(x: number, y: number, z: number) {
    this._scale.x *= x;
    this._scale.y *= y;
    this._scale.z *= z;
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
    this._transformOnWorld = onWorld;
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

  lookAt(x: number = 0, y: number = 0, z: number = 0) {
    // target.transform.position = Vector3.zero;
    // let target = new Vec3(x,y,z),
    //   eye = this._position.clone(),
    //   up = new Vec3(0,1,0),
    //   forward = new Vec3(0,0,1),
    //   dir = target.sub(eye.x, eye.y, eye.z);



    // let  q = new Quaternion().setFromUnitVectors(forward, dir);

    // let newUp = q.clone().mul(up.x,up.y,up.z, up.w);

    // let  qNew = new Quaternion().setFromUnitVectors(newUp, up);
    // transform.rotation = qNew * q;

    // this._quaternion
  }

  /**
   * 
   *  */

  add(obj: Object3d) {
    if (this === obj) {
      console.warn('this is the same with obj')
      return
    }
    obj._parent = this;
    this._children.push(obj)
  }

  // end

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