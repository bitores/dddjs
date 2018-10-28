import { UIMaterial } from "./UIMaterial";
import { ShaderChunk } from "./chunks/ShaderChunk";
import { GLTools } from "../GLTools";


export class UICubeTextureMaterial extends UIMaterial {
  // image map

  constructor(config: Object = {}) {
    super()

    this.config = {
      u_Sampler: null,
      // textureCoord: new Float32Array([
      //   0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0,
      //   1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0,
      //   0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0
      // ]),
      ...config
    }
  }

  shaderSource() {
    let vert = `
    attribute vec2 a_TextCoord;
    varying vec2 v_TexCoord;`,
      vertMain = "v_TexCoord = a_TextCoord; ",
      frag = `
    uniform samplerCube u_Sampler;
    varying vec2 v_TexCoord;`,
      fragMain = "gl_FragColor = textureCube(u_Sampler, vec3(v_TexCoord.xy,1));";

    this.shader = new ShaderChunk(vert, vertMain, frag, fragMain)
  }

  handle() {
    // let tbo = GLTools.createVBO(this.ctx, this.config["textureCoord"], false)
    // let texture = GLTools.createTexture(this.ctx, this.config['u_Sampler'], {});
    let texture = GLTools.createCubeTexture(this.ctx, this.config['u_Sampler'], {});

    // this.config["a_TextCoord"] = tbo;
    this.config['u_Sampler'] = texture;
  }
}