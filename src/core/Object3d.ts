import Base from "../Base";
import { Vec3 } from "../math/Vec3";
import { Mat4 } from "../math/Mat4";
import { Quaternion } from "../math/Quaternion";
import { Euler } from "../math/Euler";

export class Object3d extends Base {
  protected _children: Node[];
  protected _parent: Node | null = null;
  private _positon: Vec3 = new Vec3();
  public _scale: Vec3 = new Vec3(1, 1, 1);
  public _quaternion: Quaternion = new Quaternion();
  public _euler: Euler = new Euler();
  protected _modelMatrix: Mat4 = Mat4.E;
  protected isRightHand: boolean = true;
  constructor(public _name: string, _pos: Vec3 = new Vec3(0, 0, 0)) {
    super()
    this._positon = _pos;
    this.isRightHand = false;
  }

  get name() {
    return this._name;
  }

  public get position() {
    return this._positon;
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