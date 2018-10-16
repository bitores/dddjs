import { Camera } from "./Camera";
import { Mat4 } from "../math/Mat4";

export class PerspectiveCamera extends Camera {
  constructor(fov: number = 45, aspect: number = 1.0, near: number = 1, far: number = 1000) {
    super('perspect camera');
    this._perspectMatrix = Mat4.perspective(fov, aspect, near, far);
  }
}