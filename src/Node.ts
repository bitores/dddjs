import Base from "./Base";
import { Vec3 } from "./math/Vec3";

export default abstract class Node extends Base {
  protected _name: string;
  protected _pos: Vec3;
  protected _children: Node[];
  protected _parent: Node = null;
  // _positon: Vec3 = new Vec3();
  // _scale: Vec3 = new Vec3(1, 1, 1);
  // _rotation: Vec3 = new Vec3();

  constructor(_name: string, _pos: Vec3 = new Vec3(0, 0, 0)) {
    super()
    this._name = _name;
  }

  get name() {
    return this._name;
  }

  get postion() {
    return this._pos;
  }

  get children() {
    return this._children;
  }

  get parent() {
    return this._parent;
  }
}