import { Camera } from "./Camera";
import { Mat4 } from "../math/Mat4";

export class UICamera extends Camera {
  constructor() {
    super('UI Camera');
    this._projectMatrix = Mat4.perspective(90, 1.0, 1, 50);
  }
}