import { UIMaterial } from "./UIMaterial";
import { ShaderChunk } from "./chunks/ShaderChunk";
import { GLTools } from "../GLTools";


export class UITextureMaterial extends UIMaterial {
  // image map

  constructor(config: Object = {}) {
    super()

    this.config = {
      u_Sampler: null,
      textureCoord: new Float32Array([
        1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0,
      ]),
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
    let tbo = GLTools.createVBO(this.ctx, this.config["textureCoord"], false)
    let texture = GLTools.createTexture(this.ctx, this.config['u_Sampler'], {});

    this.config["a_TextCoord"] = tbo;
    this.config['u_Sampler'] = texture;
  }
}