import Node from '../Node';
import { Vec3 } from '../math/Vec3';
import { point2Webgl } from '../utils/utils';

export class UIObject extends Node {
  _data: number[];
  private _vertices: Float32Array;
  private _indices: Uint16Array;
  // _colors: number[];
  private x: number;
  private y: number;
  private width: number;
  private height: number;
  constructor(x: number, y: number, w: number, h: number, _name: string = 'ui-obj') {
    super(_name, new Vec3(x, y, 0))
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;

    this.calc()

  }

  get vertices() {
    return this._vertices;
  }

  get indices() {
    return this._indices;
  }

  calcPostion() {
    let pos_webgl = point2Webgl(this.x, this.y);
    this.translateX(pos_webgl.x)
    this.translateY(pos_webgl.y)
  }

  calc() {
    // 以 世界【0，0，0】为原点 计算坐标
    // 物体 坐标 与 世界原点 重合， 顶点不包括位置信息
    this._vertices = new Float32Array([
      this.width / 2.0, this.height / 2.0, 0,
      this.width / 2.0, -this.height / 2.0, 0,
      -this.width / 2.0, -this.height / 2.0, 0,
      -this.width / 2.0, this.height / 2.0, 0
    ])

    this._indices = new Uint16Array([
      0, 1, 2,
      0, 2, 3
    ])

    this.calcPostion()
  }


  calc1() {
    // 以 世界【0，0，0】为原点 计算坐标
    // 物体 坐标 与 世界原点 重合， 顶点包括位置信息
    this._vertices = new Float32Array([
      -1 + this.x, 1 - this.y, 0,
      -1 + this.x + this.width, 1 - this.y, 0,
      -1 + this.x, 1 - (this.y + this.height), 0,
      -1 + this.x + this.width, 1 - (this.y + this.height), 0,
    ])

    this._indices = new Uint16Array([
      1, 2, 0,
      1, 2, 3
    ])
  }
}