import { UIMaterial } from "./UIMaterial";
import { ShaderChunk } from "./chunks/ShaderChunk";
import { GLTools } from "../tools/GLTools";


export class UIMultiTexturesMaterial extends UIMaterial {
  // image map

  constructor(config: {
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
      gl_FragColor   = vColor * smpColor1 * smpColor0;
      `;

    this.shader = new ShaderChunk(vert, vertMain, frag, fragMain)
    console.log('')
  }

  handle() {
    let texture0 = GLTools.createTexture(this.ctx, this.config['texture0'], { unit: 0 });
    let texture1 = GLTools.createTexture(this.ctx, this.config['texture1'], { unit: 1 });

    this.config['texture0'] = texture0;
    this.config['texture1'] = texture1;
    this.isReady = true;
  }
}