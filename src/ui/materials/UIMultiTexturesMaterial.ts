import { UIMaterial } from "./UIMaterial";
import { ShaderChunk } from "./chunks/ShaderChunk";
import { GLTools } from "../GLTools";


export class UIMultiTexturesMaterial extends UIMaterial {
  // image map

  constructor(config: {
    dynamic?: boolean
  }) {
    super()

    this.config = {
      // color: null,
      texture0: null,
      texture1: null,
      ...config
    }
  }

  shaderSource() {
    let vert = `
    attribute vec4 color;
    attribute vec2 a_TextCoord;
    varying   vec4 vColor;
    varying vec2 v_TexCoord;`,
      vertMain = `
      vColor = color;
      v_TexCoord = a_TextCoord; 
      `,
      frag = `
      uniform sampler2D texture0;
      uniform sampler2D texture1;
    varying   vec4 vColor;
    varying vec2 v_TexCoord;`,
      fragMain = `
      vec4 smpColor0 = texture2D(texture0, v_TexCoord);
      vec4 smpColor1 = texture2D(texture1, v_TexCoord);
      gl_FragColor   = vColor * smpColor0 * smpColor1;
      `;

    this.shader = new ShaderChunk(vert, vertMain, frag, fragMain)
  }

  handle() {
    // let tbo = GLTools.createVBO(this.ctx, this.config["textureCoord"], false)
    console.log(this.config)
    let texture0 = GLTools.createTexture(this.ctx, this.config['texture0'], {});
    let texture1 = GLTools.createTexture(this.ctx, this.config['texture1'], {});

    // this.config["a_TextCoord"] = tbo;
    this.config['texture0'] = texture0;
    this.config['texture1'] = texture1;
  }
}