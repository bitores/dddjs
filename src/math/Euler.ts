import Base from '../Base';
import { Quaternion } from './Quaternion';
// 欧拉角：常用的旋转表示方法便是四元数和欧拉角
// 欧拉角描述旋转的过程中，可能会出现一种被称为“万向节死锁”的情况
// 死锁:pitch为90度后,不能在实现yaw的旋转了
// 若绕z-y-x轴的顺序旋转，欧拉角为yaw (ψ), pitch (θ) and roll (φ) 。
// Pitch: 俯仰 around the x-axis 
// Yaw: 偏航（航向）around the y-axis
// Roll:横滚 around the z-axis
export class Euler extends Base {
  // pitch, yaw, roll 单位：角度
  // 按 z-y-x 顺序 RPY
  static DefaultOrder: string = 'XYZ';
  constructor(public pitch: number = 0, public yaw: number = 0, public roll: number = 0, public order: string = Euler.DefaultOrder) {
    super()
  }

  get className() {
    return 'Euler';
  }


  quaternion() {
    let halfToRad = 0.5 * Math.PI / 180.0;

    let halX = this.pitch * halfToRad, halY = this.yaw * halfToRad, halZ = this.roll * halfToRad;
    let sx = Math.sin(halX);
    let cx = Math.cos(halX);
    let sy = Math.sin(halY);
    let cy = Math.cos(halY);
    let sz = Math.sin(halZ);
    let cz = Math.cos(halZ);

    let x = sx * cy * cz - cx * sy * sz;
    let y = cx * sy * cz + sx * cy * sz;
    let z = cx * cy * sz - sx * sy * cz;
    let w = cx * cy * cz + sx * sy * sz;
    return new Quaternion(x, y, z, w);
  }

  // --------  start
  trigger() {
    this._onChangeCallback();
  }

  onChange(callback) {
    this._onChangeCallback = callback;
  }

  _onChangeCallback() {

  }
  // ---------- end


  clone() {
    return new Euler(this.pitch, this.yaw, this.roll);
  }

  toString() {
    return `()`;
  }
}