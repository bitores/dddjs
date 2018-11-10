// import { ImagesLoaded } from "../tools/ImagesLoaded";
import { GLTools } from "../tools/GLTools";
/**
 * 复用
 *  
 * */
export class UITexture {
  public _texture: WebGLTexture | null = null;
  public isReady: boolean = false;
  constructor(public ctx: WebGLRenderingContext, public url: string | string[] | null = null, option: object = {}) {

    if (this.url !== null) {
      this.handle()
    } else {
      this.createDataTexture()
    }
  }

  handle() {
    // let that = this;
    // let url = this.url;
    // if (url) {
    //   if (Object.prototype.toString.call(url) === "[object Array]") {

    //     new ImagesLoaded(url).onLoad((image) => {
    //       that._texture = GLTools.createTexture(that.ctx, image, {});
    //       that.isReady = true;
    //     })
    //   } else if (Object.prototype.toString.call(url) === "[object String]") {
    //     new ImagesLoaded([url]).onLoad((image) => {
    //       that._texture = GLTools.createTexture(that.ctx, image, {});
    //       that.isReady = true;
    //     })
    //   }
    // }


  }

  createDataTexture() {
    this._texture = GLTools.createDataTexture(this.ctx, {});
    this.isReady = true;
  }
}