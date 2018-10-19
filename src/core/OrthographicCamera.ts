import { Camera } from "./Camera";
import { Mat4 } from "../math/Mat4";

export class OrthographicCamera extends Camera {
  // [-1,1] w=2, h=2
  constructor(w: number = 2, h: number = 2, near: number = 1.0, far: number = 1000) {
    super('Orthographic Camera');
    this._projectMatrix = Mat4.orthographicWHNF(w, h, near, far);
  }
}