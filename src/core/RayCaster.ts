import Base from '../Base';
import { Camera } from './Camera';

export class RayCaster extends Base {
  constructor(public camera: Camera) {
    super()
  }

  intersectObjects(x, y, objects: []) {

    objects.forEach(obj => {

    })

    return [];
  }

  get className() {
    return 'RayCaster';
  }

  clone() {
    // return new UIShaderSource();
  }

  toString() {
    return '()';
  }
}