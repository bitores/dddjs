import { Camera } from "../core/Camera";
import { UIObject } from "./UIObject";

/**
 * 
 */
export class ShaderCache {
  auto: Object = Object.create(null);
  config: Object | null = null;
  attributes: Object[] = [];
  uniforms: Object[] = [];

  constructor() {
    this.auto = {
      Pmatrix: [],
      Vmatrix: [],
      Mmatrix: [],
    }
  }

  setAuto(camera: Camera, obj: UIObject) {
    this.auto = {
      Pmatrix: camera._projectMatrix,
      Vmatrix: camera._viewMatrix,
      Mmatrix: obj._modelMatrix,
    }
  }
}