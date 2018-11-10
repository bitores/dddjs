import { ImagesLoaded } from "../tools/ImagesLoaded";
import { GLTools } from "../tools/GLTools";
import { UITexture } from "./UITexture";
/**
 * 复用
 *  
 * */
export class UICubeTexture extends UITexture {
  constructor(public ctx: WebGLRenderingContext, public url, option: object = {}) {
    super(ctx, null, option)
  }

  handle() {
    let that = this;
    if (this.url !== null) {
      new ImagesLoaded(this.url).onLoad((images) => {
        that._texture = GLTools.createCubeTexture(this.ctx, images, {});
        that.isReady = true;
      })
    }
  }

}