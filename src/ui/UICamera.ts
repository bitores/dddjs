import { Camera } from "../core/Camera";
import { Mat4 } from "../math/Mat4";
// import { fovy } from "../tools/index";

export class UICamera extends Camera {
  constructor() {
    super('UI Camera');
    this.translateZ(20)
    // this.isRightHand = false;
    this._projectMatrix = Mat4.perspective(1, 1, 1, 1000, this.isRightHand); // 透视投影fovy(4, 1)
    // this._projectMatrix = Mat4.perspective(fovy(2, 1), 1, 1, 1000, this.isRightHand); // 透视投影fovy(4, 1)
    // this._projectMatrix = Mat4.perspectiveWHNF(4, 4, 1, 1000, this.isRightHand); // 透视投影
    // this._projectMatrix = Mat4.perspectiveWHNF(9, 16, 1, 1000, this.isRightHand); // 透视投影
    // this._projectMatrix = Mat4.perspectiveLRTBNF(-2, 2, 2, -2, 1, 1000, this.isRightHand); // 透视投影
    // this._projectMatrix = Mat4.orthographicWHNF(4, 4, 1, 1000, this.isRightHand) // 正交投影
    // this._projectMatrix = Mat4.orthographicLRTBNF(-2, 2, 2, -2, 1, 1000, this.isRightHand) // 正交投影
    // this._projectMatrix = Mat4.orthographicWHNF(2, 2, 1, 1000, this.isRightHand) // 正交投影
  }
}