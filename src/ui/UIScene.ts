import { Color } from "../math/Color";
import { Object3d } from "../core/Object3d";

// https://baike.baidu.com/item/%E5%85%AB%E5%8F%89%E6%A0%91/5635733?fr=aladdin
// 八叉树就是用在3D空间中的场景管理，可以很快地知道物体在3D场景中的位置，或侦测与其它物体是否有碰撞以及是否在可视范围内。
export class UIScene {
  // 场景视口
  public viewport: number[] = [0.0, 0.0, 1.0, 1.0];
  // 背景色
  public clearColor: Color = new Color(0, 0, 0, 0);
  public clearMask: number;
  public clearDepth: number;
  public depthFunc: number;

  public nodes: any[] = [];
  constructor() {
    // DEPTH_TEST: depthFunc
    // BLEND: blendFunc
  }

  find(node: Object3d) {
    // this.nodes.forEach(node => {

    // });

    if (this.nodes.indexOf(node) === -1) {
      this.nodes.push(node)
    } else {

    }
  }

  add(node: Object3d) {
    if (this.nodes.indexOf(node) === -1) {
      this.nodes.push(node)
    } else {
      console.warn('has one same node here')
    }
  }

  remove(node: Object3d) {
    if (this.nodes.indexOf(node) === -1) {

      console.warn('has one same node here')
    } else {
      this.nodes.push(node)

    }
  }
}