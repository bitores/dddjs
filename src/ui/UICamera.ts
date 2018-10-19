import { Camera } from "../core/Camera";
import { Mat4 } from "../math/Mat4";

export class UICamera extends Camera {
  constructor() {
    super('UI Camera');
    // this._projectMatrix = Mat4.perspective(90, 1.0, 1, 50); // 透视投影
    this._projectMatrix = Mat4.orthographicWHNF(2, 2, 1, 1000) // 正交投影
  }
}