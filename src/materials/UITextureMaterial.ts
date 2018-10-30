import { UIMaterial } from "./UIMaterial";
import { ShaderChunk } from "./chunks/ShaderChunk";
import { GLTools } from "../tools/GLTools";
import { ImagesLoaded } from "../tools/ImagesLoaded";


export class UITextureMaterial extends UIMaterial {
  // image map

  constructor(config: {
    dynamic?: boolean
  }) {
    super()

    this.config = {
      image: null,
      u_Sampler: null,
      ...config
    }
  }

  shaderSource() {
    let vert = `
    attribute vec2 a_TextCoord;
    varying vec2 v_TexCoord;`,
      vertMain = "v_TexCoord = a_TextCoord; ",
      frag = `
    uniform sampler2D u_Sampler;
    varying vec2 v_TexCoord;`,
      fragMain = "gl_FragColor = texture2D(u_Sampler, v_TexCoord);";

    this.shader = new ShaderChunk(vert, vertMain, frag, fragMain)
  }

  handle() {
    let that = this;
    new ImagesLoaded([this.config['image']]).onProgress((image) => {
      let texture = GLTools.createTexture(that.ctx, image, {});
      that.config['u_Sampler'] = texture;
      that.isReady = true;
    })
  }
}