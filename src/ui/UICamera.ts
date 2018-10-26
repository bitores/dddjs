import { Camera } from "../core/Camera";
import { Mat4 } from "../math/Mat4";
import { fovy } from "../utils/utils";

export class UICamera extends Camera {
  constructor() {
    super('UI Camera');
    this._projectMatrix = Mat4.perspective(fovy(4, 1), 1, 1, 1000); // 透视投影fovy(4, 1)
    // this._projectMatrix = Mat4.perspectiveWHNF(4, 4, 1, 1000); // 透视投影
    // this._projectMatrix = Mat4.perspectiveLRTBNF(-2, 2, 2, -2, 1, 1000); // 透视投影
    // this._projectMatrix = Mat4.orthographicWHNF(4, 4, 1, 1000) // 正交投影
    // this._projectMatrix = Mat4.orthographicLRTBNF(-2, 2, 2, -2, 1, 1000) // 正交投影
    this._projectMatrix = Mat4.orthographicWHNF(2, 2, 1, 1000) // 正交投影
  }
}