import { UIMaterial } from "./UIMaterial";
import { ShaderChunk } from "./chunks/ShaderChunk";


export class UIShaderMaterial extends UIMaterial {
  // image map

  constructor(public config: object = {}) {
    super()
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
  }
}