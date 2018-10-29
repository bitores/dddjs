import { Color } from "../math/Color";
import { Object3d } from "../core/Object3d";

export class UIScene {
  public viewport: number[] = [0.0, 0.0, 1.0, 1.0];
  public clearColor: Color = new Color(0, 0, 0, 0);
  public clearMask: number;
  public clearDepth: number;
  public depthFunc: number;

  public nodes: any[] = [];
  constructor() {
    // DEPTH_TEST: depthFunc
    // BLEND: blendFunc
  }

  add(node: Object3d) {
    if (this.nodes.indexOf(node) === -1) {
      this.nodes.push(node)
    } else {
      console.warn('has one same node here')
    }
  }
}